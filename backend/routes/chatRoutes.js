const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatControllers");

const router = express.Router();

// Accesses chat or creates a new chat for current user
router.route("/").post(protect, accessChat);
// Returns all chats for current user
router.route("/").get(protect, fetchChats);
// Creating new Group
router.route("/group").post(protect, createGroupChat);
// Rename Group
router.route("/rename").put(protect, renameGroup);
// Remove a user from Group
router.route("/groupremove").put(protect, removeFromGroup);
// Adding new user to Group
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
