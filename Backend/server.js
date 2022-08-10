require("dotenv").config();

const express = require("express");
// const bodyParser = require("body-parser");
// const multer = require("multer");
const cors = require("cors");

const connectDB = require("./db/db");
const users = require("./router/users");
const listings = require("./router/listings");
const conversations = require("./router/conversations");
const messages = require("./router/messages");

// const upload = multer();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB(process.env.MONGODB_URI);

// // for parsing application/xwww-
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// //form-urlencoded

// // for parsing multipart/form-data
// app.use(upload.array());
// app.use(express.static("public"));

app.use("/users", users); // {{server}}/users/
app.use("/listings", listings); // {{server}}/listings/
app.use("/conversations", conversations); // {{server}}/conversations/
app.use("/messages", messages); // {{server}}/messages/

const PORT = process.env.PORT || 5001;
app.listen(PORT);
