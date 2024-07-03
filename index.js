const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const crypto = require('crypto');
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");


dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());



mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`Connected to MongoDB!`.green.bold);
  })
  .catch((err) => {
    console.log(err);
  });


const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`.yellow.bold);
});


app.get("/",(req,res)=>{
    res.send("Server is running.");
})


const userRoute = require("./src/routes/user");
// const cookieParser = require("cookie-parser");


app.use("/api/user",userRoute);
/*
 const authRoute = require("./src/routes/authRoute");
 const courseRoute = require("./src/routes/courseRoute");


app.use("/api/auth",authRoute);
app.use("/api/course",courseRoute);





app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,'client','dist','index.html'));
});

*/




const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(64); // 32 bytes = 256 bits
  return secretKey.toString('base64');
};

process.env.JWT_SECRET = generateSecretKey();



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});