"use strict";
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env["DATASOURCES_RACE_ADDR"] || "localhost",
      port: process.env["DATASOURCES_RACE_PORT"] || 5432,
      database: process.env["DATASOURCES_RACE_HOST"] || "races_db",
      user: process.env["DATASOURCES_RACE_USER"] || "races",
      password:
        process.env["DATASOURCES_RACE_PASSWORD"] || "localhost",
    },
    pool: {
      min: process.env["DATASOURCES_RACE_OPTIONS_POOL_MAX"] || 1,
      max: process.env["DATASOURCES_RACE_OPTIONS_POOL_MIN"] || 10,
    },
    migrations: {
      tableName: "knex_migrations",
    }, 
  },
  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./test.sqlite3",
    },
  }
};
