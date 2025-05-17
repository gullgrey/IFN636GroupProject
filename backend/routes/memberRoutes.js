const express = require("express");
const MemberController = require("../controllers/memberController");
const ProxyController = require("../controllers/ProxyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

const getMembers = async (req, res) => {
  if (req.user.role === "admin") {
    MemberController.getMembers(req, res);
  } else {
    ProxyController.getMembers(req, res);
  }
};
const addMember = MemberController.addMember;
const updateMember = MemberController.updateMember;
const deleteMember = MemberController.deleteMember;

router.route("/").get(protect, getMembers).post(protect, addMember);
router.route("/:id").put(protect, updateMember).delete(protect, deleteMember);

module.exports = router;
