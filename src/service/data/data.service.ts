import { Injectable } from '@nestjs/common';
import { forkJoin, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import wiki from 'wikipedia';

import { DefaultParties } from '../../data/default-data';
import { PartyAbbreviation } from '../party/party.enum';
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
        this.fetchWikipediaPartyData(PartyAbbreviation.V);
    }

    private fetchWikipediaPartyData(party: PartyAbbreviation) {
        from(wiki.page('Vänsterpartiet'))
            .pipe(
                mergeMap((page) => {
                    return forkJoin([from(page.intro()), from(page.infobox()), selectIdeologies(from(page.html()))]);
                }),
            )
            .subscribe(([intro, infobox, html]) => {
                //console.log(intro);
                //console.log(infobox);
            });
    }
}
