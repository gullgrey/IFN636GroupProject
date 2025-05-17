const MemberController = require("./memberController");
const LoanController = require("./loanController");

class ProxyController {
  static getLoans = async (req, res) => LoanController.getLoans(req, res, true);

  static getMembers = async (req, res) =>
    MemberController.getMembers(req, res, true);

  static addData = async (req, res) => {
    try {
      return res.status(401).json({
        message: "Unauthorized: You do not have permission to add this data.",
      });
    } catch (error) {
      logger.error("Error adding data", {
        userId: req.user?.id,
        error: error.message,
      });
      res.status(500).json({ message: error.message });
    }
  };

  static updateData = async (req, res) => {
    try {
      return res.status(401).json({
        message:
          "Unauthorized: You do not have permission to update this data.",
      });
    } catch (error) {
      logger.error("Error updating data", {
        userId: req.user?.id,
        error: error.message,
      });
      res.status(500).json({ message: error.message });
    }
  };

  static deleteData = async (req, res) => {
    try {
      return res.status(401).json({
        message:
          "Unauthorized: You do not have permission to delete this data.",
      });
    } catch (error) {
      logger.error(`Error deleting record`, { error: error.message });
      res.status(500).json({ message: error.message });
    }
  };
}

// const getLoans = async (req, res) => {
//   if (req.user.role === "admin") {
//     LoanController.getLoans(req, res);
//   } else {
//     ProxyController.getLoans(req, res);
//   }
// };

// // const getLoans = LoanController.getLoans;
// const addLoan = LoanController.addLoan;
// const updateLoan = LoanController.updateLoan;
// const deleteLoan = LoanController.deleteLoan;
module.exports = ProxyController;
