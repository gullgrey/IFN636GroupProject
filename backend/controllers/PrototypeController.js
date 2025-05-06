class PrototypeController {
  static getData = async (req, res, model) => {
    try {
      const books = await model.find({ userId: req.user.id });
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static deleteData = async (req, res, model) => {
    try {
      const book = await model.findById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      await book.remove();
      res.json({ message: "Book deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = PrototypeController;
