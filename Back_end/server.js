const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();
const productRoutes = require("./routes/productRoutes");

// MIDDLEWARE

app.use(cors());

app.use(express.json());


// ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


// TEST ROUTE

app.get("/", (req,res)=>{

  res.send("Backend Running Successfully");

});


// DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

  console.log("MongoDB Connected");

})
.catch((error)=>{

  console.log(error);

});


// PORT

const PORT = process.env.PORT || 5000;


// SERVER

app.listen(PORT, ()=>{

  console.log(`Server Running On Port ${PORT}`);

});