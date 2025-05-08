const Member = require("../models/Member");
const PrototypeController = require("./PrototypeController");
const logger = require('../utils/logger');

class MemeberController extends PrototypeController {
  static getMembers = async (req, res) =>
    MemeberController.getData(req, res, Member);

  static addMember = async (req, res) => {
    const { name, dateOfBirth, gender } = req.body;
    try {
      const member = await Member.create({
        userId: req.user.id,
        name,
        gender,
        dateOfBirth,
      });
      //Add logger
      logger.info("Admin added member", {
        memberId: member._id,
        userId: req.user?.id,
        name: member.name,
        gender: member.gender,
      });
      res.status(201).json(member);
    } catch (error) {
      logger.error("Error adding member", { userId: req.user?.id, error: error.message });
      res.status(500).json({ message: error.message });
    }
  };

  static updateMember = async (req, res) => {
    const { name, dateOfBirth, gender } = req.body;
    try {
      const member = await Member.findById(req.params.id);
      if (!member) {
        logger.warn(`Member with ID ${req.params.id} not found`);
        return res.status(404).json({ message: "Member not found" });
      }
      member.name = name || member.name;
      member.gender = gender || member.gender;
      member.dateOfBirth = dateOfBirth || member.dateOfBirth;
      const updatedMember = await member.save();
      logger.info("Admin updated member", { memberId: updatedMember._id, userId: req.user?.id });
      res.json(updatedMember);
    } catch (error) {
      logger.error("Error updating member", { userId: req.user?.id, error: error.message });
      res.status(500).json({ message: error.message });
    }
  };

  static deleteMember = async (req, res) =>
    MemeberController.deleteData(req, res, Member);
}

const getMembers = MemeberController.getMembers;
const addMember = MemeberController.addMember;
const updateMember = MemeberController.updateMember;
const deleteMember = MemeberController.deleteMember;
module.exports = { getMembers, addMember, updateMember, deleteMember };
