
import User from "../../../models/User";
import db from "../../../utils/db";
import { sendEmail } from "../../../utils/sendEmail";

export default async(req,res) => {
    try{
      await db.connect();
   
      const user = await User.findOne({ email: req.body });
   
        if(!user){
          return  res.status(400).json({message:"User does not exist"})
        }
  
        const resetToken = new Date().getTime();

          user.resetPasswordToken = resetToken;
          user.resetPasswordExpire =  Date.now() + 15*60*1000;
          await user.save()
          await db.disconnect();
          try{
            const resetPasswordUrl = `http://localhost:3000/user/password/reset/${resetToken}`; 
         
            const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`
           
             const options = {
              email: req.body,
              subject: `Ecommerce Password Recovery`,
              message,
          }
    
         await sendEmail(options);

             res.status(200).json({message:"Please check your email to reset your password"})
          }
         catch(err){
           res.status(401).json({message:"Something went wrong"});
         }
        
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}