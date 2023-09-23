import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI || "";

const client = new MongoClient(connectionString);

async function run() {
  try {
    return await client.connect();
  } catch(e) {
    throw Error(`Failed to connect to DB: ${e}`)
  }
}

const db = run().then((connection) => {
  return connection.db("question-repository");
});

export default db;