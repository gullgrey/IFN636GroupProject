const Book = require("../models/Book");
const PrototypeController = require("./PrototypeController");
const logger = require("../utils/logger");
const notifier = require("../observers/Notifier");

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

      //log admin action: add book
      logger.info("Admin added book", {
        bookId: book._id,
        userId: req.user?.id,
        title: book.title,
        isbn: book.isbn,
      });

      notifier.notifySubscribers(
        "A new book has been added: " +
          book.title +
          ", with " +
          book.copies +
          " copies available!"
      );

      res.status(201).json(book);
    } catch (error) {
      logger.error("Error adding book", {
        userId: req.user?.id,
        error: error.message,
        body: req.body,
      });
      res.status(500).json({ message: error.message });
    }
  };

  static updateBook = async (req, res) => {
    const { title, author, genre, isbn, dateOfPublication, copies } = req.body;
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        logger.warn(`Book with ID ${req.params.id} not found`);
        return res.status(404).json({ message: "Book not found" });
      }
      book.title = title || book.title;
      book.author = author || book.author;
      book.genre = genre || book.genre;
      book.isbn = isbn || book.isbn;
      book.dateOfPublication = dateOfPublication || book.dateOfPublication;
      book.copies = copies || book.copies;
      const updateBook = await book.save();

      //log admin update a book
      logger.info("Admin updated book", {
        bookId: updateBook._id,
        userId: req.user?.id,
      });

      notifier.notifySubscribers(
        "The book " +
          book.title +
          " has been updated and has " +
          book.copies +
          " copies available!"
      );

      res.json(updateBook);
    } catch (error) {
      logger.error("Error updating book", {
        userId: req.user?.id,
        error: error.message,
      });
      res.status(500).json({ message: error.message });
    }
  };

  static deleteBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    BookController.deleteData(req, res, Book);
    notifier.notifySubscribers("The book " + book.title + " has been removed.");
  };
}

Object.assign(BookController, PrototypeController);

// const getBooks = BookController.getBooks;
// const addBook = BookController.addBook;
// const updateBook = BookController.updateBook;
// const deleteBook = BookController.deleteBook;
// module.exports = { getBooks, addBook, updateBook, deleteBook };
module.exports = BookController;
