import Order from "../../../models/Order";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
     const {
       user,
       orderItems,
       shippingAddress,
       paymentMethod,
       itemsPrice,
       shippingPrice,
       totalPrice
     } = req.body;
    await db.connect();
    const order = await Order.create({
      orderItems,
       shippingAddress,
       paymentMethod,
       itemsPrice,
       shippingPrice,
       totalPrice,
       orderedAt: Date.now(),
       user
      });
    
    await db.disconnect();
   res.status(201).send(order);
    }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};