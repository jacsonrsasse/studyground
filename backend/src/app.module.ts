import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [GatewayModule, EnvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
