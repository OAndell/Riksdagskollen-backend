import { Test } from '@nestjs/testing';
import { DefaultParties } from '../../data/default-data';
import { DataService } from '../data/data.service';
import { PartyAbbreviation } from './party.enum';
import { PartyService } from './party.service';

describe('PartyService', () => {
    let partyService: PartyService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [DataService, PartyService],
        }).compile();
        partyService = moduleRef.get<PartyService>(PartyService);
    });

    describe('getParties', () => {
        it('should return an array of with length 8', () => {
            const result = partyService.getParties();
            const expectedLength = 8;
            expect(result.length).toEqual(expectedLength);
        });

        it('should have the correct properties', () => {
            const party = partyService.getParties()[0];
            expect(party.name).toBeDefined();
            expect(party.abbreviation).toBeDefined();
            expect(party.description).toBeDefined();
            expect(party.twitter).toBeDefined();
            expect(party.website).toBeDefined();
        });
    });

    describe('getParty', () => {
        it('should return default V party', () => {
            const result = partyService.getParty(PartyAbbreviation.V);
            const expected = DefaultParties.find((party) => party.abbreviation === PartyAbbreviation.V);
            expect(result).toEqual(expected);
        });

        it('should be case insensitive', () => {
            const result = partyService.getParty('kD');
            const expected = DefaultParties.find((party) => party.abbreviation === PartyAbbreviation.KD);
            expect(result).toEqual(expected);
        });
    });
});
