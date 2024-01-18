import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

import path from "path";
const { DB_PASSWORD, DB_NAME } = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
}).parsed;

const uri = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.c9s0ico.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
