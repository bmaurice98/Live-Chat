const express = require("express");
const {
  accessNotifs,
  createNotif,
} = require("../controllers/NotificationController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(createNotif).get(protect, accessNotifs);
router.post("/login", authUser);

module.exports = router;
