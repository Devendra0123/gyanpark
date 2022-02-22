import Product from "../../../models/Product";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
    await db.connect();
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      images: req.body.images,
      description: req.body.description
    });
    await newProduct.save();
    await db.disconnect();
    res.status(201).json({message:"successfully created product"});
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};
