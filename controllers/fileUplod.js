const File = require("../models/File");

const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file that has to be  uploaded
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

//image upload

const isFileTypeSupported = (type, supportedTypes) => {
  return supportedTypes.includes(type);
};

//cloudinary upload function
const uploadFileToCloudinary = async (file, folder) => {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath);
};

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;
    console.log(file);

    const supportedTypes = ["jpg", "pgeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //validation on file format
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file formaat not supported",
      });
    }

    //file format supported then upload to cloudinary
    const response = await uploadFileToCloudinary(file, "shivansh");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      message: "image uploaded to cloudinary",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "image did not upload",
    });
  }
};
