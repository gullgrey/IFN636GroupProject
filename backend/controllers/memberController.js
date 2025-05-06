const Member = require("../models/Member");
const PrototypeController = require("./PrototypeController");

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
      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateMember = async (req, res) => {
    const { name, dateOfBirth, gender } = req.body;
    try {
      const member = await Member.findById(req.params.id);
      if (!member) return res.status(404).json({ message: "Member not found" });
      member.name = name || member.name;
      member.gender = gender || member.gender;
      member.dateOfBirth = dateOfBirth || member.dateOfBirth;
      const updatedMember = await member.save();
      res.json(updatedMember);
    } catch (error) {
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
