import { PartyAbbreviation } from '../service/party/party.enum';
import { Party } from '../service/party/party.interface';

export const DefaultParties: Party[] = [
  {
    name: 'Socialdemokraterna',
    abbreviation: PartyAbbreviation.S,
    description: {
      text: 'DESCRIPTION S',
      ideology: [
        'Demokratisk socialism',
        'Socialdemokrati',
        'Tredje vägens politik',
        'Feminism',
      ],
      source: 'Wikipedia',
    },
    website: 'www.socialdemokraterna.se',
    twitter: 'socialdemokrat',
  },
  {
    name: 'Moderaterna',
    abbreviation: PartyAbbreviation.M,
    description: {
      text: 'DESCRIPTION M',
      ideology: ['Liberalkonservatism', 'Marknadsliberalism'],
      source: 'Wikipedia',
    },
    website: 'www.moderaterna.se',
    twitter: 'moderaterna',
  },
  {
    name: 'Sverigedemokraterna',
    abbreviation: PartyAbbreviation.SD,
    description: {
      text: 'DESCRIPTION SD',
      ideology: [
        'Nationalkonservatism',
        'Socialkonservatism',
        'Nationalism',
        'Euroskepticism',
      ],
      source: 'Wikipedia',
    },
    website: 'www.sd.se',
    twitter: 'sdriks',
  },
  {
    name: 'Centerpartiet',
    abbreviation: PartyAbbreviation.C,
    description: {
      text: 'DESCRIPTION C',
      ideology: [
        'Liberalism',
        'Socialliberalism',
        'Grön ideologi',
        'Decentralism',
        'Liberalfeminism',
      ],
      source: 'Wikipedia',
    },
    website: 'www.centerpartiet.se',
    twitter: 'centerpartiet',
  },
  {
    name: 'Vänsterpartiet',
    abbreviation: PartyAbbreviation.V,
    description: {
      text: 'DESCRIPTION V',
      ideology: [
        'Socialism',
        'Feminism',
        'Grön ideologi/Ekologism',
        'Euroskepticism',
      ],
      source: 'Wikipedia',
    },
    website: 'www.vansterpartiet.se',
    twitter: 'vansterpartiet',
  },
  {
    name: 'Kristdemokraterna',
    abbreviation: PartyAbbreviation.KD,
    description: {
      text: 'DESCRIPTION KD',
      ideology: ['Kristdemokrati', 'Socialkonservatism'],
      source: 'Wikipedia',
    },
    website: 'www.kristdemokraterna.se',
    twitter: 'kdriks',
  },
  {
    name: 'Liberalerna',
    abbreviation: PartyAbbreviation.L,
    description: {
      text: 'DESCRIPTION L',
      ideology: ['Socialliberalism', 'Liberalfeminism'],
      source: 'Wikipedia',
    },
    website: 'www.liberalerna.se',
    twitter: 'liberalerna',
  },
  {
    name: 'Miljöpartiet',
    abbreviation: PartyAbbreviation.MP,
    description: {
      text: 'DESCRIPTION MP',
      ideology: ['Grön ideologi', 'Ekologism', 'Feminism'],
      source: 'Wikipedia',
    },
    website: 'www.mp.se',
    twitter: 'miljopartiet',
  },
];
