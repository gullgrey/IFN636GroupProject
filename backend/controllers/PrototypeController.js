const logger = require("../utils/logger");

class PrototypeController {
  static getData = async (req, res, model, requireID = false) => {
    try {
      let data;
      if (requireID) {
        data = await model.find({ userId: req.user.id });
      } else {
        data = await model.find();
      }
      // const data = await model.find();

      logger.info(`Fetched ${data.length} records from ${model.modelName}`);
      res.json(data);
    } catch (error) {
      logger.error(`Error fetching records from ${model.modelName}`, {
        error: error.message,
      });
      res.status(500).json({ message: error.message });
    }
  };

  static deleteData = async (req, res, model) => {
    try {
      const data = await model.findById(req.params.id);
      if (!data) {
        logger.warn(
          `Record with ID ${req.params.id} not found in ${model.modelName}`
        );
        return res.status(404).json({ message: "Data not found" });
      }
      await data.remove();
      logger.info(
        `Deleted record with ID ${req.params.id} from ${model.modelName}`
      );
      res.json({ message: "Data deleted" });
    } catch (error) {
      logger.error(
        `Error deleting record ${req.params.id} from ${model.modelName}`,
        { error: error.message }
      );
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = PrototypeController;
