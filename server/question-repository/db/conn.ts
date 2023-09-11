import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI ?? "";

const client = new MongoClient(connectionString);

async function connect() {
  try {
    return await client.connect();
  } catch(e) {
    throw Error(`Failed to connect to DB: ${e}`)
  }
}

const db = connect().then((conn) => {
  return conn.db("question-repository");
});

export default db;