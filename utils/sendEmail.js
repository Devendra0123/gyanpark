
import nodemailer from "nodemailer";

export async function sendEmail(options){
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host:process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            secure: false,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
            },
        });
    
        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };
      
        await transporter.sendMail(mailOptions);
    }
  
  catch(err){
      console.log(err)
  }
};
