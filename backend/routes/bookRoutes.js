const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.post("/add", async(req,res) => {
    const book =new Book(req.body);
    await book.save();
    res.json(book);

});

router.get("/all", async (req,res) => {
    const books = await Book.find();
    res.json(books);
});

router.delete("/:id",async (req,res)=>{
    await Book.findByIdAndDelete(req.params.id);
    res.json({message: "Deleted Successfully"});
});

module.exports = router;