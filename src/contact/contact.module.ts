import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controllers from './controllers';
import { Contact } from './entities';
import * as providers from './providers';
import { SharedModule } from '../shared';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), SharedModule],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class ContactModule {}
