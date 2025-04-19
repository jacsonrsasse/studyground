import { PostgresClientService } from '@libs/postgres/postgres-client.service';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

type Product = {
  id: number;
  name: string;
  description: string;
  price_in_cents: number;
  created_at: Date;
};

@Controller('products')
export class ProductsController {
  constructor(private readonly postgresClientService: PostgresClientService) {}

  @Get()
  async getProducts(@Res() response: Response) {
    response.setHeader('Transfer-Encoding', 'chunked');
    response.setHeader('Content-Type', 'application/json');
    response.write('[');

    const client = await this.postgresClientService.getClient();
    await client.query('BEGIN');
    await client.query(
      `DECLARE my_cursor CURSOR FOR SELECT * FROM products ORDER BY price_in_cents DESC`,
    );

    let firstChunk = true;

    try {
      while (true) {
        const result = await client.query<Product>(
          `FETCH FORWARD 10 FROM my_cursor`,
        );

        if (!result.rows.length) {
          console.log('No more rows to fetch');
          break;
        }

        result.rows.forEach((row) => {
          const transformedRow = {
            ...row,
            price: row.price_in_cents / 100,
          };
          if (!firstChunk) {
            response.write(',');
          }
          response.write(JSON.stringify(transformedRow));
          firstChunk = false;
        });
      }

      response.write(']'); // Fecha o array JSON
      response.end();
    } finally {
      await client.query('COMMIT');
      await this.postgresClientService.close();
    }
  }
}
