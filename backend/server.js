const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
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
    console.log("✅ MongoDB Connected");

    const db = client.db(dbName);
    const collection = db.collection("passwords");

    // GET ALL
    app.get("/", async (req, res) => {
      const data = await collection.find({}).toArray();
      res.json(data);
    });

    // ADD PASSWORD
    app.post("/", async (req, res) => {
      const { _id, ...data } = req.body;

      const result = await collection.insertOne({
        ...data,
        createdAt: new Date()
      });

      res.json({ success: true, result });
    });

    // DELETE PASSWORD
    app.delete("/", async (req, res) => {
      const { id } = req.body;

      const result = await collection.deleteOne({
        _id: new ObjectId(id)
      });

      res.json({ success: true, result });
    });

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

  } catch (err) {
    console.error("DB Error:", err);
  }
}

startServer();