import express from 'express';
import bodyParser from 'body-parser';
import Rating from '../rating.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from '../connection.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", Rating);

// MongoDB connection

const mongourl = process.env.MONGO_DB;




// Default route
app.get("/", (req, res) => {
  res.send("This is the main page");
});

// Start server
const port = 5000;
const main=async ()=>{
await connect(mongourl);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}
main();