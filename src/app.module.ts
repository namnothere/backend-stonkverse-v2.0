import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth';
import { BaseModule } from './base';
import { CommonModule, ExceptionsFilter } from './common';
import { configuration, loggerOptions } from './config';
import { ContactModule } from './contact/contact.module';
import { CourseModule } from './course/course.module';
import { LayoutModule } from './layout/layout.module';
import { LearningprogressModule } from './learningprogress/learningprogress.module';
import { NotificationModule } from './notification/notification.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // https://getpino.io
    // https://github.com/iamolegga/nestjs-pino
    LoggerModule.forRoot(loggerOptions),
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Database
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
      }),
      inject: [ConfigService],
    }),
    // Static Folder
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: '/',
    }),
    // Service Modules
    AuthModule, // Global for Middleware
    CommonModule, // Global
    BaseModule,
    // Module Router
    // https://docs.nestjs.com/recipes/router-module
    UserModule,
    CourseModule,
    LearningprogressModule,
    ContactModule,
    NotificationModule,
    OrderModule,
    LayoutModule,
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    // Global Pipe, Validation check
    // https://docs.nestjs.com/pipes#global-scoped-pipes
    // https://docs.nestjs.com/techniques/validation
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // disableErrorMessages: true,
        transform: true, // transform object to DTO class
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
