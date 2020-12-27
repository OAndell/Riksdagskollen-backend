import { Injectable } from '@nestjs/common';
import { Party } from './party.interface';
import { DataService } from '../data/data.service';
@Injectable()
export class PartyService {
    constructor(private dataService: DataService) {}

    public getParties(): Party[] {
        return this.dataService.getPartyData();
    }

    public getParty(abbreviation: string): Party {
        return this.dataService.getPartyData().find((party) => party.abbreviation.toLocaleLowerCase() === abbreviation.toLocaleLowerCase());
    }
}
