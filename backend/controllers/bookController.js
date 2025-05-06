const Book = require("../models/Book");
const PrototypeController = require("./PrototypeController");

class BookController extends PrototypeController {
  static getBooks = async (req, res) => BookController.getData(req, res, Book);

  static addBook = async (req, res) => {
    const { title, author, genre, isbn, dateOfPublication, copies } = req.body;
    try {
      const book = await Book.create({
        userId: req.user.id,
        title,
        author,
        genre,
        isbn,
        dateOfPublication,
        copies,
      });
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateBook = async (req, res) => {
    const { title, author, genre, isbn, dateOfPublication, copies } = req.body;
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      book.title = title || book.title;
      book.author = author || book.author;
      book.genre = genre || book.genre;
      book.isbn = isbn || book.isbn;
      book.dateOfPublication = dateOfPublication || book.dateOfPublication;
      book.copies = copies || book.copies;
      const updateBook = await book.save();
      res.json(updateBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static deleteBook = async (req, res) =>
    BookController.deleteData(req, res, Book);
}

Object.assign(BookController, PrototypeController);

const getBooks = BookController.getBooks;
const addBook = BookController.addBook;
const updateBook = BookController.updateBook;
const deleteBook = BookController.deleteBook;
module.exports = { getBooks, addBook, updateBook, deleteBook };
