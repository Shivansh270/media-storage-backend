const express = require("express");
const router = express.Router();

const {
  imageUpload,
  videoUpload,
  imageReducerUpload,
  localFileUpload,
} = require("../controllers/fileUplod");

router.post("/localFileUpload", localFileUpload);

module.exports = router;
