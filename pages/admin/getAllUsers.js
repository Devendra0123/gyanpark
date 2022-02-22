import User from '../../models/User'
import db from '../../utils/db'
import styles from "../../styles/Token.module.css";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const GetAllUsers = ({users}) => {
    
  return (
    <div className={styles.allUsers}>
    <Navbar />
    <div style={{marginTop:'30px'}}>
    {
           users?.map((user,i)=>(
               <div key={user._id} className={styles.userList}>
                   <p className={styles.userName}>{i+1}. {user.name} </p>
                   <p className={styles.userEmail}> {user.email} </p>
               </div>
           ))
       }
    </div>

       <Footer />
    </div>
  )
}

export async function getServerSideProps() {
    await db.connect();
    const users = await User.find({}).lean();
    await db.disconnect();
  
    return { props: {
        users: users.map(db.convertDocToObj)
         } }
  }

export default GetAllUsers