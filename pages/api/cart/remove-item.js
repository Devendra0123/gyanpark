import Cart from "../../../models/Cart";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
    const {user, productId} = req.body;
    await db.connect();
    const userCart = await Cart.findOne({user: user});

    if(!userCart){
        return res.status(400).json({
            message: 'Unable to process'
        })
    }

        const itemExist = userCart.cartItems.find(item => item.productId === productId);
        if(!itemExist){
            return res.status(400).json({
                message: 'Unable to process'
            })
        }
  
            const filterCart = userCart.cartItems.filter(item => item.productId != productId);
            userCart.cartItems = filterCart;
            await userCart.save({ validateBeforeSave: false });
  
    await db.disconnect();
   
    res.status(201).json({
        success: true,
        cartItems: filterCart
    });
 }
   catch(e) {
    res.status(500).json({ message: e.message })
  }
};
