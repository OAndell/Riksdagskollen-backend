import { PartyAbbreviation } from '../party/party.enum';

export interface PartyPollingData {
    party: PartyAbbreviation;
    data: PollingDataPoint[];
    source: string;
}

export interface PollingDataPoint {
    period: string;
    percent: string;
}
