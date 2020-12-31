import { Injectable } from '@nestjs/common';
import { forkJoin, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import wiki from 'wikipedia';

import { DefaultParties } from '../../data/default-data';
import { DataFetchOption, PartyAbbreviation } from './data.service.enum';
import { Party } from './data.service.interface';
import { PartyPollingData } from './data.service.interface';
import { fetchMeanPollingData } from './data.util';

@Injectable()
export class DataService {
    private partyData: Party[] = [...DefaultParties];
    private pollingData!: Map<PartyAbbreviation, PartyPollingData>;

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
        fetchMeanPollingData().subscribe((pollingData) => (this.pollingData = pollingData));
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
