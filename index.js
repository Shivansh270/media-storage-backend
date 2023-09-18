const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload());
