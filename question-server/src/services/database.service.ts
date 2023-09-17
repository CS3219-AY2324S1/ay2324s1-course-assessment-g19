import dotenv from 'dotenv';
import { Collection, Db, MongoClient } from 'mongodb';

export const collections: { questions?: Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: MongoClient = new MongoClient(process.env.MONGO_URI || '');

  await client.connect().then(() => {
    console.log(`Connected to database: ${db.databaseName}`);
  });

  const db: Db = client.db(process.env.MONGO_NAME);

  try {
    const questionsCollection: Collection = db.collection('questions');
    collections.questions = questionsCollection;
    console.log(
      `Connected to collection: ${questionsCollection.collectionName}`
    );
  } catch (e) {
    throw Error(`Failed to connect to collection: ${e}`);
  }
}
