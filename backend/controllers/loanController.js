const Loan = require("../models/Loan");
const PrototypeController = require("./PrototypeController");
const logger = require('../utils/logger');

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
      res.status(201).json(loan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateLoan = async (req, res) => {
    const { loanee, book, dueDate } = req.body;
    try {
      const loan = await Loan.findById(req.params.id);
      if (!loan) return res.status(404).json({ message: "Loan not found" });
      loan.book = book || loan.book;
      loan.loanee = loanee || loan.loanee;
      loan.dueDate = dueDate || loan.dueDate;
      const updateLoan = await loan.save();
      res.json(updateLoan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static deleteLoan = async (req, res) =>
    LoanController.deleteData(req, res, Loan);
}

Object.assign(LoanController, PrototypeController);

const getLoans = LoanController.getLoans;
const addLoan = LoanController.addLoan;
const updateLoan = LoanController.updateLoan;
const deleteLoan = LoanController.deleteLoan;
module.exports = { getLoans, addLoan, updateLoan, deleteLoan };
