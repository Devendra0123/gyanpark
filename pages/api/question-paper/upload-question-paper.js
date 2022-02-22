import Questionpaper from "../../../models/Questionpaper";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
     const  {
        program,
        programYear,
        examYear,
        questionPaper  
      } = req.body;

    const questionPapers = {
        programYear,
        examYear,
        questionPaper 
    }
    await db.connect();
    const doesProgramExist = await Questionpaper.findOne({program: program});
    if(doesProgramExist){
      doesProgramExist.questionPaper.push(questionPapers);
     await doesProgramExist.save();
    }else{
      const newQuestionpaper = new Questionpaper({
        program,
        questionPaper:questionPapers
      });
    await newQuestionpaper.save();
    }
   
    await db.disconnect();
   
    res.status(201).json({message:"Question paper uploaded successfully"});
 }
   catch(e) {
    res.status(500).json({ message: e.message })
  }
};
