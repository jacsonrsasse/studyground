import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PostgresClientModule } from '@libs/postgres/postgres-client.module';

@Module({
  imports: [PostgresClientModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
