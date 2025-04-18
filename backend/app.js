import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Rating from './rating.js'
import cors from 'cors'

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use("/api",Rating)
const connect = (uri) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error("Error connecting to MongoDB:", err));
};

connect("mongodb://localhost:27017/rating");

app.get("/",(req,res)=>{
  res.send("this is the maibn page")
})
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
