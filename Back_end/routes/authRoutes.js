const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const User = require("../models/User");

const router = express.Router();

const transporter = nodemailer.createTransport({

  host:"smtp.gmail.com",

  port:587,

  secure:false,

  auth:{

    user:process.env.EMAIL_USER,

    pass:process.env.EMAIL_PASS

  },

  tls:{

    rejectUnauthorized:false

  }

});

// REGISTER USER

router.post("/register", async(req,res)=>{

  try{

    const { name,email,password } = req.body;

    const existingUser =
      await User.findOne({ email });

    if(existingUser){

      return res.status(400).json({

        message:"User Already Exists"

      });

    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password,salt);

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

router.post("/login", async(req,res)=>{

  try{

    const { email,password } = req.body;

    const user =
      await User.findOne({ email });

    if(!user){

      return res.status(400).json({

        message:"User Not Found"

      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if(!isMatch){

      return res.status(400).json({

        message:"Invalid Password"

      });

    }

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

// FORGOT PASSWORD

router.post("/forgot-password", async(req,res)=>{

  const { email } = req.body;

  try{

    const user =
      await User.findOne({ email });

    if(!user){

      return res.json({

        message:"User Not Found"

      });

    }

    const otp = Math.floor(

      100000 + Math.random() * 900000

    ).toString();

    user.resetOTP = otp;

    user.otpExpire =
      Date.now() + 300000;

    await user.save();

    await transporter.sendMail({

      from:process.env.EMAIL_USER,

      to:email,

      subject:"Password Reset OTP",

      html:`

        <h2>Your OTP: ${otp}</h2>

        <p>
          OTP valid for 5 minutes.
        </p>

      `

    });

    res.json({

      message:"OTP Sent Successfully"

    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message

    });

  }

});

// RESET PASSWORD

router.post("/reset-password", async(req,res)=>{

  const {

    email,
    otp,
    newPassword

  } = req.body;

  try{

    const user =
      await User.findOne({ email });

    if(!user){

      return res.json({

        message:"User Not Found"

      });

    }

    if(user.resetOTP !== otp){

      return res.json({

        message:"Invalid OTP"

      });

    }

    if(user.otpExpire < Date.now()){

      return res.json({

        message:"OTP Expired"

      });

    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    user.resetOTP = null;

    user.otpExpire = null;

    await user.save();

    res.json({

      message:
        "Password Reset Successful"

    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({

      message:"Server Error"

    });

  }

});

module.exports = router;