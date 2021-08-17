import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  logging: true,
  port: 5432,
  username: 'postgres',
  password: 'mypostgres',
  database: 'quiz_db',
  entities: [__dirname + '/../modules/**/entities/*.{js,ts}'],
  migrations: [__dirname + '/../shared/database/typeorm/migrations/*.{ts,js}'],
  cli: {
    migrationsDir: __dirname + '/../shared/database/typeorm/migrations',
  },
  synchronize: false,
};
