import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities';
import * as controllers from './controllers';
import * as providers from './providers';
import { SharedModule } from '../shared';


@Module({
  imports: [TypeOrmModule.forFeature([Contact]), SharedModule],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class ContactModule {}
