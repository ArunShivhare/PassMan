const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    console.log("MongoDB Connected");

    const db = client.db(dbName);
    const passwordsCollection = db.collection("passwords");
    const usersCollection = db.collection("users");

    // ================= JWT MIDDLEWARE =================
    function verifyToken(req, res, next) {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "No token provided"
        });
      }

      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid token"
        });
      }
    }

    // ================= AUTH ROUTE =================
    app.post("/auth", async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Missing fields"
        });
      }

      const existingUser = await usersCollection.findOne({ email });

      //  Register new user
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await usersCollection.insertOne({
          email,
          password: hashedPassword
        });

        const token = jwt.sign(
          { userId: result.insertedId },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.json({
          success: true,
          message: "Account created",
          token
        });
      }

      //  Login existing user
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Welcome back",
        token
      });
    });

    // ================= PASSWORD ROUTES =================

    //  GET passwords (user specific)
    app.get("/", verifyToken, async (req, res) => {
      const data = await passwordsCollection
        .find({ userId: req.userId })
        .toArray();

      res.json(data);
    });

    //  ADD password (attach userId)
    app.post("/", verifyToken, async (req, res) => {
      const { _id, ...data } = req.body;

      const result = await passwordsCollection.insertOne({
        ...data,
        userId: req.userId,
        createdAt: new Date()
      });

      res.json({ success: true, result });
    });

    //  DELETE password (only if belongs to user)
    app.delete("/", verifyToken, async (req, res) => {
      const { id } = req.body;

      const result = await passwordsCollection.deleteOne({
        _id: new ObjectId(id),
        userId: req.userId
      });

      res.json({ success: true, result });
    });

    app.listen(port, () => {
      console.log(` Server running on port ${port}`);
    });

  } catch (err) {
    console.error(" DB Error:", err);
  }
}

startServer();