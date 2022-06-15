const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const Notification = require("../models/NotificationModel");

const accessNotifs = expressAsyncHandler(async (req, res) => {
  try {
    const notifications = await Notification;
  } catch (error) {}
});
const createNotifs = expressAsyncHandler(async (req, res) => {});

module.exports = { accessNotifs, createNotifs };
