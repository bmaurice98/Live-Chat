const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

dotenv.config();

connectDB();
const app = express();
const bp = require("body-parser");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
// app.use("/api/chat")
// app.use("/api/chat")

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server Started on port ${PORT}`.yellow.bold));
