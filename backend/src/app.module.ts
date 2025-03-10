import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { GatewayModule } from './gateway/gateway.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [EnvModule, GatewayModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
