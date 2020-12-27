import { PartyAbbreviation } from './party.enum';

export interface Party {
    name: string;
    abbreviation: PartyAbbreviation;
    description: {
        text: string;
        ideology: string[];
        source: string;
    };
    website: string;
    twitter: string;
}
