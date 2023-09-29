import dotenv from 'dotenv';
import { Collection, Db, MongoClient } from 'mongodb';

export const collections: { questions?: Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: MongoClient = new MongoClient(process.env.MONGO_URI || '');

  const db: Db = await client.connect().then((connection) => connection.db("question-repository"));

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
