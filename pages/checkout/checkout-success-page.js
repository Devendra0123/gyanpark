import styles from "../../styles/Checkout.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from 'next/router'
import { Store } from '../../utils/store';
import { useContext, useEffect } from "react";

const CheckoutSuccessPage = () => {

    const router = useRouter();

    const { state } = useContext(Store);
    const {userInfo} = state;

    useEffect(()=>{
       if(!userInfo){
           router.push('/')
       }
    },[userInfo,router])
    
    const handleOrderPage = ()=>{
       router.push(`/user/order/${userInfo._id}`);
    }

    return (
        <div className={styles.checkoutFailurePage}>
            <Navbar />
            <div className={styles.failure_div}>
                <p style={{fontFamily:'Roboto',fontSize:'25px',color:'green',fontWeight:'600'}}>
                 Success!
                </p>
                <p style={{fontFamily:'monospace',fontSize:'20px',textAlign:'center'}}>
                    Your order has been placed successfully. Thanks for trusting <br/>in our service. We will contact you soon.
                </p>
              
                  <button onClick={handleOrderPage} style={{border:'none',padding:'10px 15px',borderRadius:'5px',backgroundColor:'crimson',color:'white',letterSpacing:'1.2px',marginTop:'10px'}}>
                      See Your Order
                  </button>
   
            </div>

            <Footer />
            
        </div>
    )
}


export default CheckoutSuccessPage
