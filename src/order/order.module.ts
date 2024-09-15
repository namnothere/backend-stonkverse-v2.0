import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controller from './controllers';
import { Order } from './entities';
import * as providers from './providers';
import { Course } from '../course/entities';
import { RegisterCourse } from '../register-course/entities';
import { StripeModule } from '../stripe';
import { User } from '../user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Order, RegisterCourse, Course, User]), StripeModule],
  controllers: Object.values(controller),
  providers: Object.values(providers),
})
export class OrderModule {}
