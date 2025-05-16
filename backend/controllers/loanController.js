const Loan = require("../models/Loan");
const PrototypeController = require("./PrototypeController");
const logger = require('../utils/logger');
// const Notifier = require('../observers/Notifier');
// const Subject = require('../observers/Subject');
class LoanController extends PrototypeController {
  static getLoans = async (req, res) => LoanController.getData(req, res, Loan);

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
      logger.error("Error adding loan", { userId: req.user?.id, error: error.message });
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

      logger.info("Admin updated loan", { loanId: updateLoan._id, userId: req.user?.id });
      res.json(updateLoan);
    } catch (error) {
      logger.error("Error updating loan", { userId: req.user?.id, error: error.message });
      res.status(500).json({ message: error.message });
    }
  };

  static deleteLoan = async (req, res) =>
    LoanController.deleteData(req, res, Loan);
  // static checkDueSoonLoans = async () => {
  //   const now = new Date();
  //   const twoDaysFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  //   const loans = await Loan.find({
  //     dueDate: { $lte: twoDaysFromNow },
  //   }).populate("userId");

  //   const notifier = new Notifier();
  //   Subject.addObserver(notifier);

  //   for (const loan of loans) {
  //     if (loan?.userId) {
  //       Subject.notifyObservers(loan.userId, loan);
  //     }
  //   }
  // };
}

Object.assign(LoanController, PrototypeController);

const getLoans = LoanController.getLoans;
const addLoan = LoanController.addLoan;
const updateLoan = LoanController.updateLoan;
const deleteLoan = LoanController.deleteLoan;
module.exports = { getLoans, addLoan, updateLoan, deleteLoan };
