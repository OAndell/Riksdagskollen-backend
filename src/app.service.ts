import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public getRoot(): string {
        return 'Riksdagskollen Backend!';
    }
}
