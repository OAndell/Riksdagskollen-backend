import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartyController } from './controller/party.controller';
import { PollingController } from './controller/polling.controller';
import { DataService } from './service/data/data.service';
import { PartyService } from './service/party/party.service';
import { PollingService } from './service/polling/polling.service';

@Module({
    imports: [],
    controllers: [AppController, PartyController, PollingController],
    providers: [AppService, PartyService, DataService, PollingService],
})
export class AppModule {}
