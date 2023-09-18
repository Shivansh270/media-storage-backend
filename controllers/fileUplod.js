const File = require("../models/File");

exports.localFileUpload = async (req, res) => {
  try {
    //extract file that has to be uploaded
    const file = req.files.file;
    console.log("file:", file);

    //server path to ehich it is meant to be stored

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    //move file to theat path
    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      success: true,
      meassage: "file uploaded to local path",
    });
  } catch (error) {
    console.log(error);
  }
};
