import { fakerPT_BR } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PostgresClientService } from '@libs/postgres/postgres-client.service';

@Injectable()
export class MakeMockProductsSeedUseCase {
  constructor(private readonly postgresClientService: PostgresClientService) {}

  async execute() {
    const client = await this.postgresClientService.getClient();

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price_in_cents INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      TRUNCATE TABLE products
      RESTART IDENTITY;
    `);

    const products = Array.from({ length: 10_000 }).map(() => ({
      name: fakerPT_BR.commerce.productName(),
      description: fakerPT_BR.commerce.productDescription(),
      price_in_cents: fakerPT_BR.number.int({ min: 100, max: 10_000 }),
    }));

    // Criar a query com múltiplos placeholders
    const values = products
      .map(
        (_, index) =>
          `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`,
      )
      .join(',');

    const query = `
      INSERT INTO products (name, description, price_in_cents) 
      VALUES ${values}
    `;

    // Criar array com todos os valores em sequência
    const parameters = products.flatMap((product) => [
      product.name,
      product.description,
      product.price_in_cents,
    ]);

    await client.query(query, parameters);
    await client.end();

    return {
      message: 'Products seed created successfully',
    };
  }
}
