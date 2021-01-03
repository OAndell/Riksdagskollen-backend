import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { PartyPollingData } from '../data/data.service.interface';
import { PartyAbbreviation } from '../data/data.service.enum';
@Injectable()
export class PollingService {
    constructor(private dataService: DataService) {}

    public getPolling(): PartyPollingData[] {
        return [...this.dataService.getPollingData().values()];
    }

    public getPollingForParty(abbreviation: string): PartyPollingData {
        return this.dataService.getPollingData().get(abbreviation.toLocaleUpperCase() as PartyAbbreviation);
    }
}
