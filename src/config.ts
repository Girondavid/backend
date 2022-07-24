const {config} = require('dotenv');
config();

export const db = {
type: process.env.type,
user: process.env.user,
database: process.env.databaseShop,
databaseShoping: process.env.database,
password: process.env.password,
host: process.env.host,
port: 5432
}
