import { Controller, Get, Param } from '@nestjs/common';
import { PartyAbbreviation } from '../service/party/party.enum';
import { Party } from '../service/party/party.interface';
import { PartyService } from '../service/party/party.service';

@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Get()
  getParties(): Party[] {
    return this.partyService.getParties();
  }

  @Get(':party')
  getParty(@Param('party') party: PartyAbbreviation): Party {
    return this.partyService.getParty(party);
  }
}
