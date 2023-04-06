import dotenv from "dotenv";
// import path from "path";
// import url from "url";
import { MongoClient } from "mongodb";

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: __dirname + "../../../../.env" });
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
    const client = new MongoClient(process.env.OLDURI);
    dbConnection = client.db("ShitShat");
    console.log("Connected to MongoDB Atlas, ShitShat");
    return dbConnection;
  } catch (error) {
    console.error(error);
  }
}
