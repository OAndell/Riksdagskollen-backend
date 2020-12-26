import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartyController } from './controller/party.controller';
import { DataService } from './service/data/data.service';
import { PartyService } from './service/party/party.service';

@Module({
  imports: [],
  controllers: [AppController, PartyController],
  providers: [AppService, PartyService, DataService],
})
export class AppModule {}
