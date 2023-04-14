import dotenv from "dotenv";

import { MongoClient } from "mongodb";

dotenv.config();

let dbConnection = undefined;

export function fetchCollection(name) {
  return connect().collection(name);
}

function connect() {
  if (dbConnection != undefined) {
    return dbConnection;
  }

  try {
    const client = new MongoClient(process.env.URI);
    dbConnection = client.db("ShitShat");
    console.log("Connected to MongoDB Atlas, ShitShat");
    return dbConnection;
  } catch (error) {
    console.error(error);
  }
}
