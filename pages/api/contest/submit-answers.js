import Contest from "../../../models/Contest";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{   
    const {contestId,tickedOption,contestantId,timeTaken} = req.body;

    await db.connect();
    const contest = await Contest.findById(contestId);
    
    const contestant = await contest?.contestant?.find(c => c.user.toString() === contestantId);
 
    if(!contestant){
        return res.status(401).json({
            message:'Sorry! student is not registered'
        })
    }
    contestant.answers = tickedOption
    const total = [];
     await tickedOption?.map(async(o) => {
       const r =  await contest.contestQuestion.find(q => q._id.toString() === o.questionId);
       if(r?.correctOption == o?.selectedOption){
        total.push({
            questionId: o.questionId
        });
       }
    })
    
    contestant.correctAnswers = total;
    contestant.timeTaken = timeTaken;

    await contest.save({ validateBeforeSave: false });
    await db.disconnect();

    res.status(200).json({
        success:true,
        message:'Answers submitted successfully'
     });
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};