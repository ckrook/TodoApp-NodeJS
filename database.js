require("dotenv").config();
const { MongoClient } = require("mongodb");

const DB_NAME = "todoapp";
const DB_CONN = process.env.DB_CONN;

async function getDb() {
  const client = new MongoClient(DB_CONN);
  await client.connect();
  const db = client.db(DB_NAME);
  return db;
}

module.exports = getDb;
