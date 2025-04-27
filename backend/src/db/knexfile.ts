import type { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
})

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      port: 5432,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'pg',
    connection: "postgresql://root:cm6fP8lSukNYjUePwgRvarvMr2M8Lule@dpg-cuis56i3esus739ldbfg-a.oregon-postgres.render.com/ascent_db",
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config