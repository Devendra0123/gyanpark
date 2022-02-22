import Contest from "../../../models/Contest";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
      
    const {contestId,tokens} = req.body;
    await db.connect();
    const contest = await Contest.findById(contestId);

    if(contest?.token.length > 0){
      contest.token = contest.token.concat(tokens);
     }else{
        contest.token = tokens;
     }

     await contest.save({ validateBeforeSave: false });

    await db.disconnect();
    
    res.status(200).json({
        success:true,
        message: 'Token generated successfully'
     });
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};