import styles from "../../styles/Checkout.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CheckoutSteps from "../../components/CheckoutSteps";
import { Store } from '../../utils/store';
import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import Head from 'next/head'

const Shippinginfo = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/user/login?redirect=/checkout/shipping');
    }
  }, [userInfo,router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, phoneNumber },
    });
    const shipping_info = {
      fullName,
      address,
      city,
      phoneNumber
    }
    Cookies.set('shippingAddress', JSON.stringify(shipping_info));
    router.push(`/checkout/confirm-shipping-details?user=${userInfo._id}`);
  };
    return (
        <div className={styles.shipping_info}>
           <Head>
             <title>Shipping Details</title>
             <meta name="viewport" content="initial-scale=1.0, width=device-width" />
           </Head>
            <Navbar />
            <CheckoutSteps activeStep={1} />
            <h2 className={styles.shipping_info_title}>
                Shipping Details
            </h2>

            <form onSubmit={handleSubmit} className={styles.shipping_info_container_form}>
                    <div className={styles.name}>
                      <div className={styles.faceIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14" aria-hidden="true" role="img"><path d="M7 8c-3.314 0-6 1.85-6 3.297v2.027c0 .373.358.676.8.676h10.4c.442 0 .8-.303.8-.676v-2.027C13 9.85 10.314 8 7 8zm3-5a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      </div>
                      <input
                       className={styles.formInput}
                       type="text"
                       placeholder="Name"
                       onChange={(e)=>setFullName(e.target.value)}
                       required
                       name="name"
                   />
                    </div>
                   <div className={styles.adress}>
                     <div className={styles.adressIcon}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 1l-12 12h3v10h18v-10h3l-12-12zm0 18c-1.607-1.626-3-2.84-3-4.027 0-1.721 2.427-2.166 3-.473.574-1.695 3-1.246 3 .473 0 1.187-1.393 2.402-3 4.027zm8-11.907l-3-3v-2.093h3v5.093z"/></svg>
                     </div>
                     <input
                       className={styles.formInput}
                       type="text"
                       placeholder="Address"
                       onChange={(e)=>setAddress(e.target.value)}
                       required
                       name="address"
                      />
                    </div>
                    <div className={styles.city}>
                      <div className={styles.cityIcon}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M16 7h8v17h-24v-24h16v7zm-9 12h-2v4h2v-4zm4 0h-2v4h2v-4zm7 0h-2v4h2v-4zm4-10h-6v8h4v5h2v-13zm-8-7h-12v20h1v-5h10v5h1v-20zm-8 13h-2v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2zm8-2v2h-2v-2h2zm-14-1h-2v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2zm6-2h2v2h-2v-2zm-12-1h-2v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2zm-6-3h-2v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2z"/></svg>
                      </div>
                      <input
                       className={styles.formInput}
                       type="text"
                       placeholder="City name"
                       onChange={(e)=>setCity(e.target.value)}
                       required
                       name="city"
                     />
                    </div>
                    <div className={styles.mobile}>
                      <div className={styles.mobileIcon}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 5v17h-10v-17h10zm2-5h-2v3h-10c-1.104 0-2 .896-2 2v17c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-22zm-9 20h-2v-1h2v1zm0-2h-2v-1h2v1zm0-2h-2v-1h2v1zm3 4h-2v-1h2v1zm0-2h-2v-1h2v1zm0-2h-2v-1h2v1zm3 4h-2v-1h2v1zm0-2h-2v-1h2v1zm0-2h-2v-1h2v1zm0-3h-8v-6h8v6z"/></svg>
                      </div>
                      <input
                       className={styles.formInput}
                       type="number"
                       placeholder="Mobile number"
                       onChange={(e)=>setPhoneNumber(e.target.value)}
                       required
                       name="number"
                     />
                    </div>
       
                    <button
                    type='submit'
                      className={styles.shippingBtn}>
                      Continue
                    </button>

               </form>

               <Footer />
               
        </div>
    )
}

export default Shippinginfo
