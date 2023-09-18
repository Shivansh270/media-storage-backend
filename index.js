const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

const db = require("./config/database");
db.connect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);

app.listen(PORT, () => {
  console.log(`app is running at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>This is homepage</h1>`);
});
