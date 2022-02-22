import Blog from "../../../models/Blog";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
     const  {title,titleImage,category,description} = req.body;
    await db.connect();
    const newBlog = new Blog({
      title,
      titleImage,
      category,
      description
    });
    await newBlog.save();
    await db.disconnect();
   
    res.status(201).json({message:"successfully created blog"});
 }
   catch(e) {
    res.status(500).json({ message: e.message })
  }
};
