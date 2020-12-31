import { Injectable } from '@nestjs/common';
import { forkJoin, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import fetch from 'node-fetch';
import wiki from 'wikipedia';

import { DefaultParties, getDefaultPollingData } from '../../data/default-data';
import { DataFetchOption, PartyAbbreviation } from '../party/party.enum';
import { Party } from '../party/party.interface';
import { JSDOM } from 'JSDOM';
import { PartyPollingData } from './data.service.interface';

@Injectable()
export class DataService {
    private partyData: Party[] = DefaultParties;
    private pollingData: Map<PartyAbbreviation, PartyPollingData> = getDefaultPollingData();

    constructor() {
        this.initializeData();
    }

    public getPartyData(): Party[] {
        return this.partyData;
    }

    public getPollingData(): Map<PartyAbbreviation, PartyPollingData> {
        return this.pollingData;
    }

    private initializeData(): void {
        this.fetchWikiData();
    }

    private async fetchWikiData(): Promise<void> {
        await wiki.setLang('sv');
        this.partyData.forEach((party) => {
            this.fetchWikipediaPartyData(party);
        });
        this.fetchWikipediaPollingData();
    }

    private fetchWikipediaPollingData(): void {
        from(
            fetch(
                'https://sv.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=Opinionsunders%C3%B6kningar_inf%C3%B6r_riksdagsvalet_i_Sverige_2022',
            ),
        )
            .pipe(mergeMap((response: any) => response.json()))
            .subscribe((response) => {
                const html_code = response['parse']['text']['*'];
                const dom = new JSDOM(html_code, 'text/html');
                const tables: NodeList = dom.window.document.querySelectorAll('.wikitable');
                const tablesSpread = [...tables] as HTMLTableElement[];
                const meanValueTable = [...tablesSpread[0].rows];

                const partyIndexes = new Map<number, string>();
                const partyIndexRow = [...meanValueTable[1].cells];
                partyIndexRow.forEach((cell, index) => {
                    partyIndexes.set(index + 1, cell.textContent.trim());
                });
                for (let index = 3; index < meanValueTable.length; index++) {
                    const cells = [...meanValueTable[index].cells];
                    const period = cells[0].textContent.replace(/\s+/g, ' ');
                    for (let i = 1; i < cells.length; i++) {
                        const cellValue = cells[i].textContent.replace(/\s+/g, ' ').trim();
                        const party = partyIndexes.get(i) as PartyAbbreviation;
                        if (this.pollingData.has(party)) {
                            this.pollingData.get(party).data.push({
                                period,
                                percent: cellValue,
                            });
                        }
                    }
                }
            });
    }

    private fetchWikipediaPartyData(party: Party): void {
        const wikiInfo$ = from(wiki.page(party.wikipedia)).pipe(
            mergeMap((page) => {
                const introText$ = from(page.intro()).pipe(map((text) => text.split('\n')[0]));
                const infoBox$ = from(page.infobox());
                return forkJoin([introText$, infoBox$]);
            }),
        );

        wikiInfo$.subscribe(([intro, infoBox]) => {
            switch (party.description.fetchOption) {
                case DataFetchOption.SUMMARY:
                    party.description.text = intro;
                    break;
                case DataFetchOption.FETCH_ALL:
                    party.description.text = intro;
                    party.description.ideology = infoBox.ideologi;
                    break;
            }
            party.description.source = 'Wikipedia';
        });
    }
}
