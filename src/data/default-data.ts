import { DataFetchOption, PartyAbbreviation } from '../service/party/party.enum';
import { Party } from '../service/party/party.interface';

export const DefaultParties: Party[] = [
    {
        name: 'Socialdemokraterna',
        abbreviation: PartyAbbreviation.S,
        description: {
            text: 'DESCRIPTION S',
            ideology: ['Demokratisk socialism', 'Socialdemokrati', 'Tredje vägens politik', 'Feminism'],
            source: 'Wikipedia',
            fetchOption: DataFetchOption.FETCH_ALL,
        },
        website: 'www.socialdemokraterna.se',
        twitter: 'socialdemokrat',
        wikipedia: 'Socialdemokraterna_(Sverige)',
    },
    {
        name: 'Moderaterna',
        abbreviation: PartyAbbreviation.M,
        description: {
            text: 'DESCRIPTION M',
            ideology: ['Liberalkonservatism', 'Marknadsliberalism'],
            source: 'Wikipedia',
            fetchOption: DataFetchOption.FETCH_ALL,
        },
        website: 'www.moderaterna.se',
        twitter: 'moderaterna',
        wikipedia: 'moderaterna',
    },
    {
        name: 'Sverigedemokraterna',
        abbreviation: PartyAbbreviation.SD,
        description: {
            text: 'DESCRIPTION SD',
            ideology: ['Nationalkonservatism', 'Socialkonservatism', 'Nationalism', 'Euroskepticism'],
            source: 'Wikipedia',
            fetchOption: DataFetchOption.FETCH_ALL,
        },
        website: 'www.sd.se',
        twitter: 'sdriks',
        wikipedia: 'Sverigedemokraterna',
    },
    {
        name: 'Centerpartiet',
        abbreviation: PartyAbbreviation.C,
        description: {
            text: 'DESCRIPTION C',
            ideology: ['Liberalism', 'Socialliberalism', 'Grön ideologi', 'Decentralism', 'Liberalfeminism'],
            source: 'Wikipedia',
            fetchOption: DataFetchOption.FETCH_ALL,
        },
        website: 'www.centerpartiet.se',
        twitter: 'centerpartiet',
        wikipedia: 'Centerpartiet',
    },
    {
        name: 'Vänsterpartiet',
        abbreviation: PartyAbbreviation.V,
        description: {
            text:
                'Vänsterpartiet (V) är ett svenskt socialistiskt och feministiskt parti på ekologisk grund. Partiledare är sedan den 31 oktober 2020 Nooshi Dadgostar.',
            ideology: ['Socialism', 'Feminism', 'Grön ideologi/Ekologism', 'Euroskepticism'],
            source: 'Wikipedia',
            fetchOption: DataFetchOption.SUMMARY,
        },
        website: 'www.vansterpartiet.se',
        twitter: 'vansterpartiet',
        wikipedia: 'vänsterpartiet',
    },
    {
        name: 'Kristdemokraterna',
        abbreviation: PartyAbbreviation.KD,
        description: {
            text: 'DESCRIPTION KD',
            ideology: ['Kristdemokrati', 'Socialkonservatism'],
            source: 'Wikipedia',
            fetchOption: DataFetchOption.FETCH_ALL,
        },
        website: 'www.kristdemokraterna.se',
        twitter: 'kdriks',
        wikipedia: 'Kristdemokraterna_(Sverige)',
    },
    {
        name: 'Liberalerna',
        abbreviation: PartyAbbreviation.L,
        description: {
            text: 'DESCRIPTION L',
            ideology: ['Socialliberalism', 'Liberalfeminism'],
            source: 'Wikipedia',
            fetchOption: DataFetchOption.FETCH_ALL,
        },
        website: 'www.liberalerna.se',
        twitter: 'liberalerna',
        wikipedia: 'liberalerna',
    },
    {
        name: 'Miljöpartiet',
        abbreviation: PartyAbbreviation.MP,
        description: {
            text: 'DESCRIPTION MP',
            ideology: ['Grön ideologi', 'Ekologism', 'Feminism'],
            source: 'Wikipedia',
            fetchOption: DataFetchOption.FETCH_ALL,
        },
        website: 'www.mp.se',
        twitter: 'miljopartiet',
        wikipedia: 'miljöpartiet',
    },
];
