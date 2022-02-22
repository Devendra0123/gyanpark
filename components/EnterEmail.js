import { useState } from "react";
import styles from "../styles/LoginSignUp.module.css";
import axios from 'axios';

const EnterEmail = ({cancel}) => {

  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");

  const handleClick = async(e)=>{
       const {data} = await axios.post('/api/user/reset-password-token',   
                               email,
                               {headers: {
                                 'Content-Type': 'application/json'
                               }
                             });
                          if(data?.message){
                            setMessage(data.message)
                          }
                        }
                      
    return (
        <div className={styles.forgot_password}>
  
          {
            message 
            ? <p style={{color:"white",fontSize:"16px",wordSpacing:"2px",letterSpacing:"1.5px",textAlign:"center",fontFamily:"Roboto",backgroundColor:"transparent"}}>{ message }</p>
            : (
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <p className={styles.forgot_password_title}>Forgot Your Password?</p>
              <div className={styles.enterEmailBar} style={{display:"flex",alignItems:"center",backgroundColor:"grey",padding:"2px",borderRadius:"5px"}}>
            <p style={{fontSize:"30px"}}>📧</p>
            <input
              className={styles.resetInput}
              type="email" 
              placeholder="Enter email" 
              onChange={(e)=> setEmail(e.target.value)}
              />
           </div>
           <button 
              style={{letterSpacing:"1.3px",marginTop:"10px",borderRadius:"5px",border:"none",padding:"5px 10px",backgroundColor:"crimson",color:"white",fontSize:"15px"}}
              onClick={handleClick}
              >
                 Next
           </button>
              </div>
            )
          }
           
           <div onClick={cancel} className={styles.cross}>
             <div className={styles.line1}></div>
             <div className={styles.line2}></div>
        </div>
        </div>
    )
}

export default EnterEmail
