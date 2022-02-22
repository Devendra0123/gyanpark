import Order from "../../../models/Order";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
     const {
     orderId
     } = req.body;
    await db.connect();
    const order = await Order.findById(orderId);
    if(!order){
        return res.status(404).json({message:'Order not found'})
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.save()
    await db.disconnect();
   res.status(201).json({
       message:'Success'
   });
    }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};