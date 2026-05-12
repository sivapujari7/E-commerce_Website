const express = require("express");

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

// REGISTER USER

router.post("/register", async (req,res)=>{

  try{

    const {name,email,password} = req.body;

    // CHECK USER

    const existingUser = await User.findOne({email});

    if(existingUser){

      return res.status(400).json({
        message:"User Already Exists"
      });

    }

    // ENCRYPT PASSWORD

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password,salt);

    // CREATE USER

    const newUser = new User({

      name,
      email,
      password:hashedPassword

    });

    await newUser.save();

    res.status(201).json({

      message:"User Registered Successfully"

    });

  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});

module.exports = router;