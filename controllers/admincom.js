const Community = require("../models/community");
const Report = require("../models/reports");
const Admin = require("../models/admins");
const Monetizereq = require("../models/Montenziation");
const Store = require("../models/Request");
const Delivery = require("../models/deliveries");
const User = require("../models/userAuth");

exports.getCommunities = async (req, res) => {
  try {
    const data = await Community.find();
    const comlength = data.length;
    res.status(200).json(comlength);
  } catch (e) {
    res.status(400).json({ error: "User not found" });
  }
};
exports.getreports = async (req, res) => {
  try {
    const data = await Report.find();
    //  console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ error: "User not found" });
  }
};
exports.getactiveusers = async (req, res) => {
  try {
    const data = await Admin.find();
    //  console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ error: "User not found" });
  }
};
exports.getmonetization = async (req, res) => {
  try {
    const data = await Monetizereq.find();
    //  console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ error: "User not found" });
  }
};
exports.getstore = async (req, res) => {
  try {
    const data = await Store.find();
    //  console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ error: "User not found" });
  }
};
exports.approvestore = async (req, res) => {
  try {
    const { userid, statuss } = req.body;
    const storee = await Store.findOne({ userid }); // Assuming you want to find by userid
    if (!storee) return res.status(402).send("Store does not exist");
    else {
      storee.status = statuss;
      await storee.save(); // Save the changes
      const user = await User.findById(userid)
      user.isStoreVerified = true
      await user.save()
      res.status(200).json({ message: "Store status updated successfully" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Error updating store status" });
  }
};
exports.getdeliveries = async (req, res) => {
  try {
    const data = await Delivery.find();
    //  console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ error: "User not found" });
  }
};
