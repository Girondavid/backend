import { Pool } from 'pg';
import { User } from './DataBases/User';
import {DataSource} from 'typeorm';
import { db } from './config';
import { CartShop } from './DataBases/CartShop';
export const pool = new Pool({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: db.port
});

export const DataSources = new DataSource({
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
  database: db.databaseShoping,
  synchronize: true,
  logging: true,
  entities: [User, CartShop],
  subscribers: [],
  migrations: [],
});