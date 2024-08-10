const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v4: uuid4 } = require("uuid");
const file = require("../models/file");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage: storage,
  limit: { filesize: 100*1024*1024 },//100MB
}).single("file");

router.post("/api/files", upload, async (req, res) => {
  //check file is not empty
  if (!req.file) {
      res.status(500).send({ message: "Please Select a file" });
  }

  // creating new instance of file
  const uuid = uuid4();
  const URL = `${process.env.APP_BASE_URL}/uploads/${uuid}`;
  const File = new file({
    filename: req.file.filename,
    uuid: uuid,
    path: req.file.path,
    size: req.file.size,
  });
  console.log(File.uuid);
  
  // saving to database
  console.log("file uploaded");
  console.log(URL);
  const response = await File.save();
  res.send({message:"File uploaded successfully.",url: URL});
});


router.post("/api/files/send", async (req, res) => {
  console.log("/api/files/send, post method called");

  const { uuid, emailTo, emailFrom, expiresIN } = req.body;

  //validate request
  if (!uuid || !emailTo || !emailFrom) {
    return res
      .status(422)
      .send({ error: "All fields are required expect expiry" });
  }

  const File = await file.findOne({ uuid: uuid });

  if (file.sender) {
    return res.status(422).send({ error: "Email has been sent already" });
  }

  File.sender = emailFrom;
  File.receiver = emailTo;

  //send mail
  // const sendMail = require('../services/emailService');
  // sendMail({
  //   from: emailFrom,
  //   to: emailTo,
  //   subject: 'inShare file sharing',
  //   text: `${emailFrom} shared a file with you.`,
  //   html: require('../services/emailTemplate')({
  //             emailFrom,
  //             downloadLink: `${process.env.APP_BASE_URL}/files/${File.uuid}` ,
  //             size: parseInt(File.size/1000) + ' KB',
  //             expires: '24 hours'
  //         })
  // });
  return res.send({ success: "true" });
});

router.get("/api/files", async (req, res) => {
  console.log("/api/files, get method called");

  try {
    const files = await file.find();
    return res.send(files);
  } catch (err) {
    return res.send(err);
  }
});
module.exports = router;
