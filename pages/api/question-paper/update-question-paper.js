import Questionpaper from "../../../models/Questionpaper";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
    const  {
        examId,
        program,
        programYear,
        examYear,
        questionPaper  
      } = req.body;
    await db.connect();
    const que = await Questionpaper.findById(examId);

    program ? que.program = program : programYear ? que.programYear = programYear : examYear ? que.examYear = examYear : questionPaper ? que.questionPaper = questionPaper : null
    await que.save({ validateBeforeSave: false });
    await db.disconnect();
    res.status(201).json({message:"successfully updated product"});
 }
   catch (e) {
    res.status(500).json({ message: e.message })
  }
};
