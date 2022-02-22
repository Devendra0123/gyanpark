import Contest from "../../../models/Contest";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{   
    const {contestId,contestantId,contestantName,token,phoneNumber} = req.body;
  
    const contestant = {
        user: contestantId,
        name: contestantName,
        token: token,
        phoneNumber: phoneNumber
    }
    await db.connect();
    const contest = await Contest.findById(contestId).select('contestant tokenSystem token');
    if(contest?.tokenSystem == 'no'){
       const userExist = contest.contestant?.find(c => c.user === contestantId);
       if(userExist){
           return res.status(204).json({
               success: true,
               message: 'You have already registered for this contest'
           })
       }
       if(!userExist){
           contest.contestant.push({user:contestantId,name:contestantName,phoneNumber:phoneNumber})
       }
    }
    else{
        const isTokenExist = contest.token.find(t => t.token === token);
        if(!isTokenExist){
            return res.status(401).json({
                message: 'Invalid token'
            })
        }
        if(isTokenExist){
            const isUsedToken = contest.contestant.find(c => c.token === token);
            if(isUsedToken){
                return res.status(401).json({
                    message: 'Invalid token'
                })
            }else{
                contest.contestant.push(contestant)
            }
        }
    }
   
    await contest.save({ validateBeforeSave: false });
    await db.disconnect();
    
    res.status(200).json({
        success:true,
        message: 'You have successfully joined the contest',
     });
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};