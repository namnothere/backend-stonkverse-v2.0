import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BannerImage, Category, FaqItem, Layout } from './entities';
import * as controllers from './controllers';
import * as providers from './providers';
import { User } from '../user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Layout, Category, BannerImage, FaqItem, User])],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class LayoutModule {}
