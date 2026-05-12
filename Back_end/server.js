const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

// MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);


app.use(cors());

app.use(express.json());

// TEST ROUTE

app.get("/", (req,res)=>{

  res.send("Backend Running Successfully");

});

// PORT

const PORT = process.env.PORT || 5000;

// SERVER

app.listen(PORT, ()=>{

  console.log(`Server Running On Port ${PORT}`);

});
// DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

  console.log("MongoDB Connected");

})
.catch((error)=>{

  console.log(error);

});