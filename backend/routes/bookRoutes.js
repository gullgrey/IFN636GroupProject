const express = require("express");
const BookController = require("../controllers/bookController");
const ProxyController = require("../controllers/ProxyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

const getBooks = BookController.getBooks;
const addBook = async (req, res) => {
  if (req.user.role === "admin") {
    BookController.addBook(req, res);
  } else {
    ProxyController.addData(req, res);
  }
};
const updateBook = async (req, res) => {
  if (req.user.role === "admin") {
    BookController.updateBook(req, res);
  } else {
    ProxyController.updateData(req, res);
  }
};
const deleteBook = async (req, res) => {
  if (req.user.role === "admin") {
    BookController.deleteBook(req, res);
  } else {
    ProxyController.deleteData(req, res);
  }
};

router.route("/").get(protect, getBooks).post(protect, addBook);
router.route("/:id").put(protect, updateBook).delete(protect, deleteBook);

module.exports = router;
