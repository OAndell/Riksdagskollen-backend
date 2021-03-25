import { DataFetchOption, PartyAbbreviation } from './data.service.enum';

export interface PartyPollingData {
    party: PartyAbbreviation;
    data: PollingDataPoint[];
    source: string;
}

export interface PollingDataPoint {
    period: string;
    percent: string;
}
export interface Party {
    name: string;
    abbreviation: PartyAbbreviation;
    description: {
        text: string;
        ideology: string[];
        source: string;
        fetchOption: DataFetchOption;
    };
    website: string;
    twitter: string;
    wikipedia: string;
    color: string;
    electionResult: string;
    seats: number;
}
