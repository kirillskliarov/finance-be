import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configFactory } from './appCore/config/configFactory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BrokerModule } from './broker/broker.module';
import { AccountModule } from './account/account.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { DealModule } from './deal/deal.module';
import { entities } from './appCore/entities/entities';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { interceptorProviders } from './appCore/providers/interceptor.providers';
import { pipeProviders } from './appCore/providers/pipe.providers';
import { guardProviders } from './appCore/providers/guard.providers';
import { SecurityModule } from './security/security.module';
import { InOutModule } from './in-out/in-out.module';
import { SplitModule } from './split/split.module';

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
          entities: [...entities],
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    BrokerModule,
    AccountModule,
    PortfolioModule,
    DealModule,
    AuthModule,
    SessionModule,
    SecurityModule,
    InOutModule,
    SplitModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...pipeProviders,
    ...interceptorProviders,
    ...guardProviders,
  ],
})
export class AppModule {}
