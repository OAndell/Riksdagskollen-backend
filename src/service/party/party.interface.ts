import { DataFetchOption, PartyAbbreviation } from './party.enum';

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
}
