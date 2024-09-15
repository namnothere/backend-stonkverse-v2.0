import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import { STRIPE } from '../shared/constants';

@Module({
  providers: [
    {
      provide: STRIPE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new Stripe(configService.get<string>('STRIPE_SECRET_KEY'));
      },
    },
  ],
  exports: [STRIPE],
})
export class StripeModule {
  // static forRootAsync(): DynamicModule {
  //   const stripeProvider = {
  //     provide: STRIPE,
  //     inject: [ConfigService],
  //     useFactory: (configService: ConfigService) => {
  //       const apiKey = configService.get<string>('STRIPE_SECRET_KEY');
  //       return new Stripe(apiKey);
  //     },
  //   };
  //   return {
  //     module: StripeModule,
  //     imports: [ConfigModule],
  //     providers: [stripeProvider],
  //     // exports: [stripeProvider],
  //   };
  // }
}
