const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  sendMessage,
  allMessages,
  deleteAllMessages,
} = require("../controllers/MessageControllers");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/clearhistory").put(protect, deleteAllMessages);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
