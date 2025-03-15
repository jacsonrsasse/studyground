import { Module } from '@nestjs/common';
import { EnvModule } from './libs/env/env.module';
import { BooksModule } from './modules/books/books.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    EnvModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
