import styles from "../styles/Home.module.css";
import Link from "next/link";
import Cookies from 'js-cookie'
import { useEffect,useState,useContext } from "react";
import SpeedDial from './SpeedDial';
import { Store } from "../utils/store";

function Navbar({activePage}) {
  const [displaySpeedDial,setDisplaySpeedDial] = useState(false);
  const [admin,setAdmin] = useState(false);
  const { state,dispatch } = useContext(Store);
  const { userInfo } = state;
  const [user,setUser] = useState('');
  const [clicked, setClicked] = useState(false);

  const removeToken = ()=>{
    dispatch({ type: 'USER_LOGOUT'});
     Cookies.remove('userInfo');
  }
useEffect(() => {
  setUser(userInfo)
  if(userInfo){
    setAdmin(userInfo.isAdmin);
  }
}, [userInfo]);

  const activeNavItem = activePage;
    return (
        <div className={styles.navbar}>

        <div className={styles.navbar_wrapper}> 
           <Link href="/" passHref>
              <h1 className={styles.logo}>
                GYAN <span className={styles.logo_span}>PARK</span>
              </h1>
           </Link>
           <div className={styles.navItems} id={`${clicked && styles.show_header}`}>
             <ul className={styles.navItems_lists}>
               <Link href="/" passHref>
                 <li 
                  className={`${styles.navItem} ${activeNavItem===1 && styles.active}`}>
                  Home
                 </li>
               </Link>
               <Link href="/store" passHref>
                 <li className={`${styles.navItem} ${activeNavItem===2 && styles.active}`}>
                  Store
                 </li>
               </Link>
               <Link href="/blog" passHref>
                 <li className={`${styles.navItem} ${activeNavItem===3 && styles.active}`}>
                  Blog
                 </li>
               </Link>
               <Link href="/ebook" passHref>
                 <li className={`${styles.navItem} ${activeNavItem===4 && styles.active}`}>
                  E-book
                 </li>
               </Link>
               <Link href="/board-question" passHref>
                 <li className={`${styles.navItem} ${activeNavItem===5 && styles.active}`}>
                  Board Question
                 </li>
               </Link>
               <Link href="/contest" passHref>
                 <li className={`${styles.navItem} ${activeNavItem===6 && styles.active}`}>
                   Contest
                 </li>
               </Link>
               {
                 !user &&
                 <div>
                 <Link href="/user/login" passHref>
                 <li className={styles.mbl_login}>LogIn</li>
               </Link>
               <Link href="/user/signup" passHref>
                 <li className={styles.mbl_signUp} style={{marginTop:'10px'}}>
                     <h3 className={styles.signUp_text}>SignUp</h3>
                     <p className={styles.forContest_text}>for contest</p>
                 </li>
               </Link>
               </div>
               }
              
             </ul>
           </div>

           {
            user
             ? (<div>
             {
               user.isAdmin == true ?
               <Link href='/admin' passHref>
               <button className={styles.adminBtn}>
                 Admin Panel
               </button>
               </Link>               
               :  <div className={styles.user} onMouseEnter={()=> setDisplaySpeedDial(true)} onMouseLeave={()=> setDisplaySpeedDial(false)}>
                 <div style={{display:"flex",alignItems:"center"}}>
                   <h1 onClick={()=> setDisplaySpeedDial(true)} className={styles.user_letter}>
                    {`${user?.name?.charAt(0)}`}
                    </h1>
                    <p className={styles.user_name}>{user.name}</p>
                 </div>
                {
                  displaySpeedDial &&  <SpeedDial logoutUser={removeToken} />
                }
               </div>
             }
            
             </div>
              )
                
             : (<div className={styles.login_signUp}>
               <Link href="/user/login" passHref>
                 <button className={styles.navbar_login}>LogIn</button>
               </Link>
               <Link href="/user/signup" passHref>
                 <button className={styles.navbar_signUp}>
                     <h3 className={styles.signUp_text}>SignUp</h3>
                     <p className={styles.forContest_text}>for contest</p>
                 </button>
               </Link>
           </div>)
           }

           <div onClick={()=> setClicked(!clicked)} className={styles.burgerIcon}>
             <svg width="24" height="24" fill='yellow' xmlns="http://www.w3.org/2000/svg"><path d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z" fill="#1040e2"/><path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z"/></svg>
           </div>
        </div>    

        </div>
    )
}

export default Navbar
