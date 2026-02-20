import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TestService {
  constructor(private readonly dataSource: DataSource) {}

  async resetDatabase() {
    const entities = this.dataSource.entityMetadatas;

    for (const entity of entities) {
      await this.dataSource.query(
        `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
      );
    }

    return { message: 'Database reset successfully' };
  }
}
