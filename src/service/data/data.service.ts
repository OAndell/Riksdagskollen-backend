import { Injectable } from '@nestjs/common';
import { forkJoin, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import wiki from 'wikipedia';

import { DefaultParties } from '../../data/default-data';
import { Party } from '../party/party.interface';
import { selectIdeologies } from './data.service.util';
@Injectable()
export class DataService {
    private partyData: Party[] = DefaultParties;

    constructor() {
        this.initializeData();
    }

    public getPartyData(): Party[] {
        return this.partyData;
    }

    private async initializeData() {
        await wiki.setLang('sv');
        this.fetchWikiData();
    }

    private fetchWikiData() {
        this.partyData.forEach((party) => {
            this.fetchWikipediaPartyData(party);
        });
    }

    private fetchWikipediaPartyData(party: Party) {
        from(wiki.page(party.wikipedia))
            .pipe(
                mergeMap((page) => {
                    const infoText$ = from(page.intro()).pipe(map((text) => text.split('\n')[0]));
                    return forkJoin([infoText$, from(page.infobox())]);
                }),
            )
            .subscribe(([intro, infoBox]) => {
                party.description.text = intro;
                //TODO ideologies ( and more ? )
            });
    }
}
