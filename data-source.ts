import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const currentEnv: 'development' | 'test' | 'production' =
  (process.env.NODE_ENV as 'development' | 'test' | 'production') ||
  'development';

const environmentConfig: DataSourceOptions = {
  development: {
    type: 'sqlite' as const,
    database: 'db.sqlite',
    entities: ['dist/**/*.entity.js'],
    migrations: ['./migrations/*.js'],
    migrationsTableName: 'migrations',
    synchronize: false,
    logging: true,
  },
  test: {
    type: 'sqlite' as const,
    database: 'test.sqlite',
    entities: ['src/**/*.entity.ts'],
    migrations: ['../migrations/*.js'],
    migrationsTableName: 'migrations',
    synchronize: true,
    dropSchema: true,
    logging: true,
    migrationsRun: false,
  },
  production: {
    type: 'postgress' as const,
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.entity.js'],
    migrations: ['./migrations/*.js'],
    migrationsTableName: 'migrations',
    synchronize: false,
    migrationsRun: true,
    ssl: {
      rejectUnauthorized: false,
    },
  },
}[currentEnv];

const AppDataSource = new DataSource({
  ...environmentConfig,
});
export default AppDataSource;
