import { Injectable } from '@nestjs/common';
import { Party } from './party.interface';
import { DataService } from '../data/data.service';
import { PartyAbbreviation } from './party.enum';

@Injectable()
export class PartyService {
    constructor(private dataService: DataService) {}

    public getParties(): Party[] {
        return this.dataService.getPartyData();
    }

    public getParty(abbreviation: PartyAbbreviation): Party {
        return this.dataService.getPartyData().find((party) => party.abbreviation.toLocaleLowerCase() === abbreviation.toLocaleLowerCase());
    }
}
