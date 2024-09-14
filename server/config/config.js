require("dotenv").config();

module.exports = {
  /* Configuration for the development environment */
  development: {
    username: process.env.PG_DEV_USER,
    password: process.env.PG_DEV_PASSWORD,
    database: process.env.PG_DEV_DATABASE,
    host: process.env.PG_DEV_HOST,
    dialect: "postgres"
  },
  /* Configuration for the test environment */
  test: {
    username: process.env.PG_TEST_USER,
    password: process.env.PG_TEST_PASSWORD,
    database: process.env.PG_TEST_DATABASE,
    host: process.env.PG_TEST_HOST,
    dialect: "postgres"
  },
  /* Configuration for the production environment */
  production: {
    username: process.env.PG_PROD_USER,
    password: process.env.PG_PROD_PASSWORD,
    database: process.env.PG_PROD_DATABASE,
    host: process.env.PG_PROD_HOST,
    dialect: "postgres"
  }
}
