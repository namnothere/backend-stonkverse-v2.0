import { Module } from '@nestjs/common';
import { LayoutService } from './layout.service';
import { LayoutController } from './layout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerImage, Category, FaqItem, Layout } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Layout,
      Category,
      BannerImage,
      FaqItem
    ])
  ],
  controllers: [LayoutController],
  providers: [LayoutService],
})
export class LayoutModule {}
