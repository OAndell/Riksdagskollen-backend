import { Injectable } from '@nestjs/common';
import { DefaultParties } from '../../data/default-data';
import { PartyAbbreviation } from '../party/party.enum';
import { Party } from '../party/party.interface';

@Injectable()
export class DataService {
  private partyData: Party[] = DefaultParties;

  public getPartyData(): Party[] {
    return this.partyData;
  }

  public fetchWikipediaPartyData(party: PartyAbbreviation) {
    throw 'not implemented';
  }
}
