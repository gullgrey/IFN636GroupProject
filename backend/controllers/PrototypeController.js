class PrototypeController {
  static getData = async (req, res, model) => {
    try {
      const data = await model.find({ userId: req.user.id });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static deleteData = async (req, res, model) => {
    try {
      const data = await model.findById(req.params.id);
      if (!data) return res.status(404).json({ message: "Data not found" });
      await data.remove();
      res.json({ message: "Data deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = PrototypeController;
