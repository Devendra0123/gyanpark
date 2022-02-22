// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";
import { signToken } from "../../../utils/jwtToken";

export default async(req,res)=>{
  try{
    await db.connect();
   
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password),
        isAdmin: false,
      });
      const user = await newUser.save();  
  await db.disconnect();

  const token = signToken(user);
  res.json({
    message:'Sign up successfull',
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  }
 catch (e) {
  res.status(500).json({ message: e.message })
}
};

