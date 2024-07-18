import express from 'express';
import {Book} from '../models/bookModel.js'
import e from 'express';
const router = express.Router();

// Route for save a new book
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({ massage: "Title and author are required" });
      }
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      });
      await newBook.save();
      return res.status(201).json(newBook);
    } catch (error) {
      console.log(error.massage);
      res.status(500).json({ massage: error.massage });
    }
  });
  
  // Route for get all books from database
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.massage);
      res.status(500).json({ massage: error.massage });
    }
  });
  
  // Route for get one book from database by id
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ massage: "Book not found" });
      }
  
      return res.status(200).json(book);
    } catch (error) {
      console.log(error.massage);
      res.status(500).json({ massage: error.massage });
    }
  });
  
  // Route for update a book
  router.put("/:id", async (req, res) => {
    try {
      if(
          !req.body.title ||
          !req.body.author ||
          !req.body.publishYear
          )
          {
              return res .status(400).send({ massage: "Title and author are required" });
          }
  
          const{id}=req.params;
          const result = await Book.findByIdAndUpdate(id,req.body);
          if(!result){
              return res.status(404).json({massage:"Book not found"});
          }
          
          return res.status(200).json({massage:"Book updated successfully"});
  
    } catch (error) {
      console.log(error.massage);
      res.status(500).json({ massage: error.massage });
    }
  });
  
  // Route for delete a book
  router.delete("/:id", async (req, res) => {
    try {
      const {id}=req.params;
      const result = await Book.findByIdAndDelete(id);
  
      if (!result){
          return res.status(404).json({massage:"Book not found"});
  
      }
      return res.status(200).json({massage:"Book deleted successfully"});
  
    }
    catch (error) {
      console.log(error.massage);
      res.status(500).json({ massage: error.massage });
    }
  });
  
  export default router;