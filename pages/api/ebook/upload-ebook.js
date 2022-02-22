import Ebook from "../../../models/Ebook";
import db from "../../../utils/db";

export default async(req,res)=>{
   try{
     const  {ebookName,ebookPrice,category,description,authorName,publicationName,previewImage,coverImage,ebookPdf} = req.body;
    await db.connect();
    const newEbook = new Ebook({
      ebookName,
      ebookPrice,
      category,
      description,
      authorName,
      publicationName,
      previewImage,
      coverImage,
      ebookPdf
    });
    await newEbook.save();
    await db.disconnect();
   
    res.status(201).json({message:"Ebook uploaded successfully"});
 }
   catch(e) {
    res.status(500).json({ message: e.message })
  }
};
