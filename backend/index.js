import express from "express";
// import { PORT } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Book } from "./models/bookModel.js";
import booksRouter from "./routes/booksRoute.js";
import cors from "cors";

// Load environment variables from .env file

dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// option 1 : allow all origins with default of cors(*)
app.use(cors());

// option 2 : Allow Custom Origins
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
//   allowedHeaders: ["Content-Type"],
  
// }));

// // Middleware for logging requests
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

app.get("/", (req, res) => {
  res.send("Welcome to the Book Store API");
});

app.use("/books", booksRouter);



mongoose
  .connect(process.env.mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
