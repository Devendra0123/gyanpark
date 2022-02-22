import nodemailer from "nodemailer";

export default async(req,res) => {
    const {email,name,location,message} = req.body;
    try{
      const sendEmail = async(options)=>{
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
            from: options.email,
            to: process.env.SMPT_MAIL ,
            subject: options.subject,
            text: options.message,
        };
      
        await transporter.sendMail(mailOptions);
      }
        
        const options = {
            email,
            subject: `message received from ${name}(${location}) ${email}`,
            message,
        }

    
         await sendEmail(options);

             res.status(200).json({message:"Please check your email to reset your password"})
          }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}