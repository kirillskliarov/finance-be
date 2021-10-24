import { APP_GUARD } from '@nestjs/core';
import { TokenAuthGuard } from '../../auth/guards/token-auth.guard';

export const guardProviders = [
  {
    provide: APP_GUARD,
    useClass: TokenAuthGuard,
  },
];
