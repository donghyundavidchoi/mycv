import { rm } from 'fs/promises';
import { join } from 'path';
import { DataSource } from 'typeorm';
import AppDataSource from '../data-source';

let dataSource: DataSource;

global.beforeAll(async () => {
  // Initialize the database connection
  dataSource = AppDataSource;
  await dataSource.initialize();
});

global.beforeEach(async () => {
  // Clear all tables before each test
  const entities = dataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.clear();
  }
});

global.afterAll(async () => {
  // Close the connection after all tests
  if (dataSource) {
    await dataSource.destroy();
  }
});

// let dataSource: DataSource;
// global.beforeEach(async () => {
//   try {
//     await rm(join(__dirname, '..', 'test.sqlite'));
//   } catch (err) {}
// });
