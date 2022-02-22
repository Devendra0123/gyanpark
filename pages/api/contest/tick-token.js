import Contest from "../../../models/Contest";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{   
    const {contestId,tokenId} = req.body;

    await db.connect();
    const contest = await Contest.findById(contestId).select('token');
 
    const existToken = contest.token?.find(t=> t._id.toString() === tokenId.toString());
    const index = contest.token.indexOf(existToken);
    contest.token[index].given = true

    await contest.save({ validateBeforeSave: false });
    await db.disconnect();
    
    res.status(200).json({
        success:true,
     });
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};