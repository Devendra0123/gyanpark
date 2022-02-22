import axios from "axios";
import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import styles from "../../../../styles/LoginSignUp.module.css";
import { useRouter } from 'next/router'
import Head from 'next/head'

const ResetPassword = () => {
    const router = useRouter()

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitHandler = async(e)=>{
        e.preventDefault();
        const { id } = router.query;
     
        if(password !== confirmPassword){
            setError("password did not match. Make sure password and confirm password are same");
          }else{
            try{
              const res = await axios.post(`/api/user/reset-password/${id}`,
              {password},
              {headers: {
                'Content-Type': 'application/json'
              }
            });
            if(res?.status === 200){
                setMessage(res.data.message)
            }
            }
            catch(err){
               setMessage('Sorry! unable to change password. Try again')
            }
           
        } 
    }
    const handleLoginRoute = ()=>{
      setMessage("");
      router.push('/user/login');
    }
    return (
        <div className={styles.resetPassword}>
        <Head>
        <title>Reset Password</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
       </Head>
            <Navbar />
            <div className={styles.resetPassword_container} style={{height:"300px"}}>
            {error && (<h2 className={styles.error}><span onClick={()=> setError("")} className={styles.errorSpan}>🗡</span>{error}</h2>)}

            {
              message
              ? <div className={styles.successMessage_div}>
                 <h2 className={styles.successMessage_div_text}> {message} </h2>
                 <button className={styles.successMessage_div_btn} onClick={handleLoginRoute}>
                   Login
                 </button>
              </div>
              :  <form 
                  onSubmit={submitHandler}
                  className={styles.signup_container_form} 
                  style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
                  >
                    <p style={{fontFamily:"Roboto",fontSize:"20px",fontWeight:"600"}}>
                        Set Password
                    </p>
                    <input 
                      className={styles.resetPasswordInput}
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e)=>setPassword(e.target.value)}
                      onFocus={()=> setError("")} />

                    <input 
                      className={styles.resetPasswordInput}
                      type="password" 
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                      onFocus={()=> setError("")} />
                    <button className={styles.submitBtn} type="submit">
                        Submit
                    </button>
                </form>
            }
               
            </div>
            <Footer />
        </div>
    )
}

export default ResetPassword
