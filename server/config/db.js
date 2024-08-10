require("dotenv").config();

const mongoose = require("mongoose");

connectDB = () => {
//   mongoose.connect(process.env.MONGO_CONNECTION_URL, {userNewUrlParser: true}, 6000000)
//   .then('open',()=>{
//       console.log('connected to DB')
//   }).catch(error=>{
//       console.log('DB connection failed')
//   })


  mongoose.connect("mongodb://127.0.0.1:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
  });

  mongoose.set("bufferCommands", false);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
  });
};

module.exports = connectDB;
