import Contest from "../../../models/Contest";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{   
    const {contestId} = req.body;
    await db.connect();
    const contest = await Contest.findById(contestId);
    await db.disconnect();
    
    res.status(200).json({
        success:true,
        token: contest.token
     });
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};