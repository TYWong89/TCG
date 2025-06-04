require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : process.env.DB_HOST || 'localhost',
      user : process.env.DB_USER || 'postgres',
      password : process.env.DB_PASS || 'docker',
      database : process.env.DB_NAME || 'carddeck'
    },
    migrations: {
      directory: './api/migrations'
    },
    seeds: {
      directory: './api/seeds'
    }
  }
};
