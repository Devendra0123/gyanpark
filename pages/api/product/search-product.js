import Product from "../../../models/Product";
import { ApiFeatures } from "../../../utils/apiFeatures";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
    await db.connect();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
   .search()
   .filter();

   const products = await apiFeatures.query;
    await db.disconnect();

    res.status(200).json({
        success:true,
        products
     });
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};
