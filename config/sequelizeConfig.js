module.exports = {
  "database": process.env.DB_NAME,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "params": {
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": false
  }
}
