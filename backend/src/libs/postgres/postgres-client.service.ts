import { EnvService } from '@libs/env/env.service';
import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class PostgresClientService {
  private client: Client | null = null;

  constructor(private readonly envService: EnvService) {}

  async getClient() {
    if (!this.client) {
      this.client = new Client(this.envService.get('DATABASE_URL'));
      await this.client.connect();
    }

    return this.client;
  }

  async close() {
    if (this.client) {
      await this.client.end();
      this.client = null;
    }
  }
}
