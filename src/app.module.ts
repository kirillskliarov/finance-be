import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configFactory } from './config/configFactory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { BrokerModule } from './broker/broker.module';
import { AccountModule } from './account/account.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { DealModule } from './deal/deal.module';
import { entities } from './entities/entities';
import { TransformInterceptor } from './interceptors/Transform.interceptor';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { TokenAuthGuard } from './auth/guards/token-auth.guard';

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
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: TokenAuthGuard,
    },
  ],
})
export class AppModule {}
