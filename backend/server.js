const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/bookreviews");

const Review = mongoose.model("Review",{
  book:String,
  author:String,
  review:String,
  rating:Number
});

app.post("/addReview", async(req,res)=>{
  const newReview = new Review(req.body);
  await newReview.save();
  res.send("Review Added");
});

app.get("/reviews", async(req,res)=>{
  const data = await Review.find();
  res.json(data);
});

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});