import Product from "../../../models/Product";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
    await db.connect();
    const products = await Product.find({});
    await db.disconnect();
    res.status(200).send(products);
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};
