const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

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


// LOGIN USER

router.post("/login", async (req,res)=>{

  try{

    const {email,password} = req.body;

    // CHECK USER

    const user = await User.findOne({email});

    if(!user){

      return res.status(400).json({

        message:"User Not Found"

      });

    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(

      password,
      user.password

    );

    if(!isMatch){

      return res.status(400).json({

        message:"Invalid Password"

      });

    }

    // CREATE TOKEN

    const token = jwt.sign(

      {

        id:user._id

      },

      "secretkey",

      {

        expiresIn:"7d"

      }

    );

    res.status(200).json({

      message:"Login Successful",

      token

    });

  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});

module.exports = router;