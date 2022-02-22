import Product from "../../../models/Product";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
       const {
           productId, name, price, stock, category, images, description
       } = req.body
    await db.connect();
    const product = await Product.findById(productId);

    name ? product.name = name : price ? product.price = price : stock ? product.stock = stock : category ? product.category = category : description ? product.description = description : images ? product.images = images : null
    await product.save({ validateBeforeSave: false });
    await db.disconnect();
    res.status(201).json({message:"successfully updated product"});
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};
