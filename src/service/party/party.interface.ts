export interface Party {
    name: string;
    abbreviation: string;
    description: {
        text: string;
        ideology: string[];
        source: string;
    };
    website: string;
    twitter: string;
}
