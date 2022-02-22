import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Store } from "../utils/store";
import { useContext } from "react";

const SpeedDial = ({logoutUser}) => {
  const { state } = useContext(Store);
  const {userInfo} = state;
 
    return (
        <div className={styles.speedDial}>
               <Link href={`/user/${userInfo?._id}/cart`} passHref>
                 <p className={styles.speedDial_list_item}>
                    <span className={styles.speedDial_list_item_span}>🛒</span> Cart
                 </p>
               </Link>
               <Link href={`/user/order/${userInfo?._id}`} passHref>
                  <p className={styles.speedDial_list_item}>
                    <span className={styles.speedDial_list_item_span}>🎁</span> Order
                  </p>
                </Link>
                <Link href={`/user/${userInfo?._id}/contest`} passHref>
                  <p className={styles.speedDial_list_item}>
                    <span className={styles.speedDial_list_item_span}>🎯</span> Contest
                  </p>
                </Link>
              
                  <p className={styles.speedDial_list_item} onClick={logoutUser}>
                    <span className={styles.speedDial_list_item_span}>🔒</span> Logout
                  </p>
          
        </div>
    )
}

export default SpeedDial
