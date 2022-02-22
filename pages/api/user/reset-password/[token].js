
import User from "../../../../models/User";
import db from "../../../../utils/db";
import bcryptjs from "bcryptjs";

export default async(req,res) => {
    try{
      await db.connect();
   
      const user = await User.findOne({ resetPasswordToken: req.query.token });
     
        if(!user){
          return  res.status(400).json({message:"Invalid token or token has expired"})
        }
        else{
     
          user.password =  bcryptjs.hashSync(req.body.password),
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          await user.save();
          await db.disconnect();
          res.status(200).json({
            message : "Password updated successfully. Please LogIn"
          });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}