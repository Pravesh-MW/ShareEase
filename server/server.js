const express = require("express");
const path = require("path");
const cors = require("cors");

// DataBase connection
const connectDB = require("./config/db");
connectDB();

// require routers
const router = require("./routers/files");
const router2 = require("./routers/post");

const app = express();

// app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(cors({ origin: "http://localhost:3000" }));
app.get("/", (req, res) => {
  // console.log('index.html');
  // Render form view
  console.log("helloworld");
  res.send("hello world");
  // res.sendFile(__dirname + '/index.html')
});

app.post("/", (req, res) => {
  return res.send(req);
});
app.use("/", router);
app.use(router2);

app.listen(2000, () => {
  console.log("server is running on port 2000");
});
