import { Args, Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
class BookEntity {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@Resolver(() => BookEntity)
export class BooksResolver {
  private books = [
    {
      id: 1,
      name: 'Harry Potter e a Pedra Filosofal',
    },
    {
      id: 2,
      name: 'Harry Potter e a Camara Secreta',
    },
  ];

  @Query(() => [BookEntity], { name: 'books' })
  findAll() {
    return this.books;
  }

  @Query(() => BookEntity, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.books.find((book) => book.id === id);
  }
}
