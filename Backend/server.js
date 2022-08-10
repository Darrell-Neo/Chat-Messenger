require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/db");
const users = require("./router/users");
const conversations = require("./router/conversations");
const messages = require("./router/messages");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB(process.env.MONGODB_URI);

app.use("/users", users); // {{server}}/users/
app.use("/conversations", conversations); // {{server}}/conversations/
app.use("/messages", messages); // {{server}}/messages/

const PORT = process.env.PORT || 5001;
app.listen(PORT);
