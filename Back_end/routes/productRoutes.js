const express = require("express");

const Product = require("../models/product");

const router = express.Router();


// ADD PRODUCT

router.post("/add", async (req,res)=>{

  try{

   const {

  name,
  price,
  stock,
  mainImage,
  images,
  description,
  category

} = req.body;
   const newProduct = new Product({

  name,
  price,
  stock,
  mainImage,
  images,
  description,
  category

});

    await newProduct.save();

    res.status(201).json({

      message:"Product Added Successfully"

    });

  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});


// GET PRODUCTS

router.get("/", async (req,res)=>{

  try{

    const products = await Product.find();

    res.status(200).json(products);

  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});

module.exports = router;