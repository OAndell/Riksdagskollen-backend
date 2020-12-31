import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('(e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200).expect('Riksdagskollen Backend!');
    });

    it('/parties (GET) should be 200', () => {
        return request(app.getHttpServer()).get('/parties').expect(200);
    });

    it('/parties/:id (GET) should be 200', () => {
        return request(app.getHttpServer()).get('/parties/m').expect(200);
    });

    it('/polling (GET) should be 200', () => {
        return request(app.getHttpServer()).get('/polling').expect(200);
    });

    it('/polling:id (GET) should be 200', () => {
        return request(app.getHttpServer()).get('/polling/v').expect(200);
    });
});
