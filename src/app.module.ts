import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configFactory } from './config/configFactory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { BrokerModule } from './broker/broker.module';
import { AccountModule } from './account/account.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { DealModule } from './deal/deal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFactory],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          ...config.get('database'),
          entities: [User],
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    BrokerModule,
    AccountModule,
    PortfolioModule,
    DealModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
