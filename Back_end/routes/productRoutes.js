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
/* DELETE PRODUCT */
/* DELETE PRODUCT */

router.delete(

  "/delete/:id",

  async(req,res)=>{

    try{

      await Product.findByIdAndDelete(

        req.params.id

      );

      res.status(200).json({

        message:
          "Product Deleted"

      });

    }
    catch(error){

      res.status(500).json({

        message:error.message

      });

    }

  }

);
/* UPDATE PRODUCT */

router.put(

  "/update/:id",

  async(req,res)=>{

    try{

      const updatedProduct =

        await Product.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new:true }

        );

      res.status(200).json({

        message:
          "Product Updated",

        updatedProduct

      });

    }
    catch(error){

      res.status(500).json({

        message:error.message

      });

    }

  }

);
module.exports = router;