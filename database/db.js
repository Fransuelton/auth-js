const { MongoClient } = require("mongodb");

require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let database;
let collection;
let auditlogcollection;

async function connectToDatabase() {
  try {
    await client.connect();
    database = client.db("auth_db");
    collection = database.collection("users");
    auditlogcollection = database.collection("auditlogs");

    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

function getDataBase() {
  return { database, collection, auditlogcollection };
}

module.exports = { connectToDatabase, getDataBase };
