import Contest from "../../../models/Contest";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
    await db.connect();
    const newContest = new Contest(req.body);
    await newContest.save();
    await db.disconnect();
   
    res.status(201).json({message:"contest created successfully"});
 }
   catch(e) {
    res.status(500).json({ message: e.message })
  }
};