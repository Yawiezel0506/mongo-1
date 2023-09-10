import { MongoClient, MongoClientOptions } from "mongodb";

const url =
  "mongodb://localhost:27017";

const clientOptions: MongoClientOptions = {};

export const client = new MongoClient(url, clientOptions);

const connectToMongo = async () => {
  try {
    await client.connect();
    // const db = client.db("shop")
    // const products = db.collection("products")
    // const allProducts = await products.find({}).toArray()
    console.log("connected to MongoDB!");
    
  } catch (error) {
    console.error("Error connecting to mongo:", error);
  }
};



export default connectToMongo;
