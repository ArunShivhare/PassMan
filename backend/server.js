const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

const client = new MongoClient(process.env.MONGO_URI);
const dbName = "passman";

async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");

    const db = client.db(dbName);
    const collection = db.collection("passwords");

    app.get("/", async (req, res) => {
      const data = await collection.find({}).toArray();
      res.json(data);
    });

    app.post("/", async (req, res) => {
      const result = await collection.insertOne(req.body);
      res.json({ success: true, result });
    });

    app.delete("/", async (req, res) => {
      const result = await collection.deleteOne(req.body);
      res.json({ success: true, result });
    });

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect MongoDB:", err);
  }
}

startServer();