import { Injectable } from '@nestjs/common';
import { forkJoin, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import wiki from 'wikipedia';
import { DefaultParties } from '../../data/default-data';
import { DataFetchOption } from '../party/party.enum';
import { Party } from '../party/party.interface';

@Injectable()
export class DataService {
    private partyData: Party[] = DefaultParties;

    constructor() {
        this.initializeData();
    }

    public getPartyData(): Party[] {
        return this.partyData;
    }

    private async initializeData(): Promise<void> {
        await wiki.setLang('sv');
        this.fetchWikiData();
    }

    private fetchWikiData(): void {
        this.partyData.forEach((party) => {
            this.fetchWikipediaPartyData(party);
        });
    }

    private fetchWikipediaPartyData(party: Party): void {
        from(wiki.page(party.wikipedia))
            .pipe(
                mergeMap((page) => {
                    const infoText$ = from(page.intro()).pipe(map((text) => text.split('\n')[0]));
                    return forkJoin([infoText$, from(page.infobox())]);
                }),
            )
            .subscribe(([intro, infoBox]) => {
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
