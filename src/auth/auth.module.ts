import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import * as providers from './providers';
import * as controllers from './controllers';
import * as strategies from './strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities';
import { SharedModule } from '../shared/shared.module';
import { PassportModule } from '@nestjs/passport';
import { STRATEGY_JWT_AUTH } from './constants';
import { AuthSerializer } from './interfaces';

@Global()
@Module({
  imports: [
    SharedModule,
    PassportModule.register({ defaultStrategy: STRATEGY_JWT_AUTH }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwtSecret'),
        signOptions: { expiresIn: config.get<string>('expiresIn') },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: Object.values(controllers),
  providers: [...Object.values(providers), ...Object.values(strategies), AuthSerializer],
  exports: Object.values(providers),
})
export class AuthModule {}
