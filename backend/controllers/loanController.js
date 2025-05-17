const Loan = require("../models/Loan");
const PrototypeController = require("./PrototypeController");
const logger = require("../utils/logger");

class LoanController extends PrototypeController {
  static getLoans = async (req, res, requireID = false) => {
    LoanController.getData(req, res, Loan, (requireID = requireID));
  };

  static addLoan = async (req, res) => {
    const { loanee, book, dueDate } = req.body;
    try {
      const loan = await Loan.create({
        userId: req.user.id,
        loanee,
        book,
        dueDate,
      });
      //Add logger
      logger.info("Admin added loan", {
        loanId: loan._id,
        userId: req.user?.id,
        loanee: loan.loanee,
        book: loan.book,
      });

      res.status(201).json(loan);
    } catch (error) {
      logger.error("Error adding loan", {
        userId: req.user?.id,
        error: error.message,
      });
      res.status(500).json({ message: error.message });
    }
  };

  static updateLoan = async (req, res) => {
    const { loanee, book, dueDate } = req.body;
    try {
      const loan = await Loan.findById(req.params.id);
      if (!loan) {
        logger.warn(`Loan with ID ${req.params.id} not found`);
        return res.status(404).json({ message: "Loan not found" });
      }
      loan.book = book || loan.book;
      loan.loanee = loanee || loan.loanee;
      loan.dueDate = dueDate || loan.dueDate;
      const updateLoan = await loan.save();

      logger.info("Admin updated loan", {
        loanId: updateLoan._id,
        userId: req.user?.id,
      });
      res.json(updateLoan);
    } catch (error) {
      logger.error("Error updating loan", {
        userId: req.user?.id,
        error: error.message,
      });
      res.status(500).json({ message: error.message });
    }
  };

  static deleteLoan = async (req, res) =>
    LoanController.deleteData(req, res, Loan);
}

Object.assign(LoanController, PrototypeController);

module.exports = LoanController;
