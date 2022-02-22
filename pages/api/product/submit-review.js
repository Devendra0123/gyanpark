import Product from "../../../models/Product";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
      
    const {rating, comment, productId,user} = req.body;

    const review = {
       user : user._id,
       name: user.name,
       rating: Number(rating),
       comment,
    };
    await db.connect();
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev)=> rev.user.toString() === review.user.toString()
     );
  
     if(isReviewed){
        product.reviews.forEach((rev)=>{
           if(rev.user.toString() === review.user.toString())
           (rev.rating = rating), (rev.comment = comment);
        });
     }else{
        product.reviews.push(review);
     }

     await product.save({ validateBeforeSave: false });

    await db.disconnect();
    
    res.status(200).json({
        success:true,
     });
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};