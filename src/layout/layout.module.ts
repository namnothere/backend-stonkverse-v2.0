import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BannerImage, Category, FaqItem, Layout } from './entities';
import { LayoutController } from './layout.controller';
import { LayoutService } from './layout.service';

@Module({
  imports: [TypeOrmModule.forFeature([Layout, Category, BannerImage, FaqItem])],
  controllers: [LayoutController],
  providers: [LayoutService],
})
export class LayoutModule {}
