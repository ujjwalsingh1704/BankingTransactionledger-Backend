const path = require("path");

require("dotenv").config(); 

console.log("ENV URI:", process.env.MONGO_URI);
const app = require("./app");
const connectToDB = require("./config/db");

// Connect to MongoDB
connectToDB();

app.listen(3000 , ()=>{
  console.log("server is running on port 3000")
})