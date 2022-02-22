import styles from "../../styles/Checkout.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from 'next/link';
import { Store } from '../../utils/store';
import { useContext, useEffect } from "react";
import {useRouter} from 'next/router';

const CheckoutFailurePage = () => {
    const router = useRouter()
    const { state } = useContext(Store);
    const {userInfo} = state;

    useEffect(()=>{
       if(!userInfo){
           router.push('/user/login')
       }
    },[userInfo,router])
    return (
        <div className={styles.checkoutFailurePage}>
          <Navbar />
            <div className={styles.failure_div}>
                <p style={{fontFamily:'Roboto',fontSize:'25px',fontWeight:'600',color:'red'}}>
                    Sorry!
                </p>
                <p style={{fontFamily:'monospace',fontSize:'20px'}}>
                    You order has failed.
                </p>
                <Link href='/checkout/payment' passHref>
                  <button style={{border:'none',padding:'10px 15px',borderRadius:'5px',backgroundColor:'blue',color:'white',letterSpacing:'1.2px',marginTop:'10px'}}>
                      Retry
                  </button>
                </Link>
            </div>

            <Footer />
            
        </div>
    )
}

export default CheckoutFailurePage
