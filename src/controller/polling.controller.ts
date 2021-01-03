import { Controller, Get, Param } from '@nestjs/common';
import { PartyPollingData } from '../service/data/data.service.interface';
import { PollingService } from '../service/polling/polling.service';

@Controller('polling')
export class PollingController {
    constructor(private readonly pollingService: PollingService) {}

    @Get()
    public getPolling(): PartyPollingData[] {
        return this.pollingService.getPolling();
    }

    @Get(':party')
    public getParty(@Param('party') party: string): PartyPollingData {
        return this.pollingService.getPollingForParty(party);
    }
}
