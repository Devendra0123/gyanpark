import Cart from "../../../models/Cart";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
    const {user, productId, quantity, productName, productImage, productPrice} = req.body;
    const cartItems = [
        {
            productId, quantity, productName, productImage, productPrice
        }
    ];

    await db.connect();
    const userCart = await Cart.findOne({user: user});

    if(userCart){
        const itemAlreadyExist = userCart.cartItems.find(item => item.productId === productId);
        if(!itemAlreadyExist){
            userCart.cartItems.push({ productId,quantity,productName,productImage,productPrice })
            await userCart.save({ validateBeforeSave: false });
        }
        if(itemAlreadyExist){
            itemAlreadyExist.quantity = itemAlreadyExist.quantity + quantity;
            console.log(itemAlreadyExist)
            await userCart.save({ validateBeforeSave: false });
        }
    }

    if(!userCart){
        const newCart = new Cart({
            user,cartItems
        });
        await newCart.save();
    }
   
    await db.disconnect();
   
    res.status(201).json({success: true});
 }
   catch(e) {
    res.status(500).json({ message: e.message })
  }
};
