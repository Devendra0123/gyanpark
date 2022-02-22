import styles from "../../styles/LoginSignUp.module.css";
import Link from "next/link"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {useState,useEffect,useContext} from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import {useRouter} from "next/router"
import EnterEmail from "../../components/EnterEmail";
import { Store } from "../../utils/store";
import Head from 'next/head'

 const Login = () => {
 const router = useRouter();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message,setMessage] = useState('');
  const [userDetails,setUserDetails] = useState({
    email:"",
    password:""
  });
  const [loading, setLoading] = useState(false);
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const inputHandler = (e)=>{
    const { name,value } = e.target;
    const user = userDetails;
  
      user[name] = value;
    
      setUserDetails(user);
  }

  const submitHandler = async(e)=>{

    e.preventDefault()
    setLoading(true);
   try{
    const {data} = await axios.post(
      '/api/user/login',
      userDetails,
        {headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  
    dispatch({ type: 'USER_LOGIN', payload: data });
    Cookies.set('userInfo', JSON.stringify(data));
    setMessage('Logged In Successfully');
    router.push(redirect || '/');
    setLoading(false)
   }
   catch(err){
     setMessage('Please enter correct email and password')
     setLoading(false)
   }
    
  }

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [userInfo,router]);
    return (
        <div className={styles.login}>
          <Head>
            <title>Login user</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
         {(forgotPassword || message) &&  <div style={{opacity:"60%",zIndex:"9",position:"absolute",width:"100%",height:"100vh",backgroundColor:"grey"}}></div>}

{
  message && <div className={styles.message}>
  <div onClick={()=> {
    setMessage(false);
    }} className={styles.cross}>
    <div className={styles.line1}></div>
    <div className={styles.line2}></div>
  </div>
    <h2 style={{fontFamily:"Roboto",fontWeight:'500',fontSize:"18px",color:"white",textAlign:"center"}}>
      {message}
    </h2>
  </div>
}
            <Navbar />
            <div className={styles.signup_container}>
              <div className={styles.signup_google}>
                <div className={styles.signup_google_svg_container}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="green" width="24" height="24" viewBox="0 0 24 24"><path d="M15.787 7.531c-5.107 2.785-12.72 9.177-15.787 15.469h2.939c.819-2.021 2.522-4.536 3.851-5.902 8.386 3.747 17.21-2.775 17.21-11.343 0-1.535-.302-3.136-.92-4.755-2.347 3.119-5.647 1.052-10.851 1.625-7.657.844-11.162 6.797-8.764 11.54 3.506-3.415 9.523-6.38 12.322-6.634z"/></svg>
                </div>
                <div className={styles.signup_google_text_container}>
                  <p style={{fontFamily:"Roboto",color:"white",textAlign:'center'}}>
                    Word is not the thing and analysis is not the way
                  </p>
                </div>
              </div>
 
                <form className={styles.signup_container_form} onSubmit={submitHandler}>
                   
                    <div className={styles.signUpEmail}>
                      <div className={styles.mailIcon}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" aria-hidden="true" viewBox="0 0 14 14" role="img"><path d="M12.6 1H1.4C.63 1 0 1.619 0 2.375v8.25C0 11.381.63 12 1.4 12h11.2c.77 0 1.4-.619 1.4-1.375v-8.25C14 1.619 13.37 1 12.6 1zM7 7.3L1.4 3.8V2.4L7 5.9l5.6-3.5v1.4L7 7.3z"></path></svg>
                      </div>
                      <input
                        className={styles.formInput}
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        onChange={(e)=>inputHandler(e)}
                       />
                     </div>
                     <div className={styles.signUpPassword}>
                       <div className={styles.lockOpenIcon}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24"><path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm4 11.723v2.277h-2v-2.277c-.596-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723z"/></svg>
                       </div>
                       <input
                        className={styles.formInput}
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        onChange={(e)=>inputHandler(e)}
                      />
                     </div>
                        <div style={{width:"70%",display:"flex",justifyContent:"flex-end"}}>
                         <p className={styles.forgotPassword_txt} onClick={()=> setForgotPassword(true)}>
                           Forgot password? 
                         </p>
                        </div>
                     {
                       loading 
                       ? <button style={{fontSize:"15px",fontFamily:"Roboto",marginTop:"10px",backgroundColor:"seagreen",border:"none",padding:"10px 15px",color:"blue"}}>
                           wait ...
                       </button>
                       : <button type="submit"  className={styles.loginBtn}>Login</button>
                     }
                    
                </form>

                <p style={{marginTop:"15px"}}>
                  Don&apos;t have account?
                  <Link href="/user/signup">
                      signUp
                  </Link>
                </p>
            </div>
                    {
                      forgotPassword && <EnterEmail cancel={()=> setForgotPassword(false)} />
                    }
              <Footer />      
        </div>
    )
}

export default Login
