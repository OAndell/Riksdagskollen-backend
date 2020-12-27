import { Controller, Get, Param } from '@nestjs/common';
import { Party } from '../service/party/party.interface';
import { PartyService } from '../service/party/party.service';

@Controller('parties')
export class PartyController {
    constructor(private readonly partyService: PartyService) {}

    @Get()
    public getParties(): Party[] {
        return this.partyService.getParties();
    }

    @Get(':party')
    public getParty(@Param('party') party: string): Party {
        return this.partyService.getParty(party);
    }
}
