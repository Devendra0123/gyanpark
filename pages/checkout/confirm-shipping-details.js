import styles from "../../styles/Checkout.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CheckoutSteps from "../../components/CheckoutSteps";
import { Store } from '../../utils/store';
import { useContext,useEffect,useState } from "react";
import Image from 'next/image'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie';
import Head from 'next/head'

const Confirmshippingdetails = () => {
    const router = useRouter();
    const [shippingDetails,setShippingDetails] = useState({});
    const [items,setItems] = useState([]);
    const { state } = useContext(Store);
    const [cartItem,setCartItem] = useState([])
    const { shippingAddress, buyItem,userInfo } = state;

    const handleContinue = ()=>{
         router.push('/checkout/payment')
    }
    useEffect(()=>{
        setShippingDetails(shippingAddress)
        if(!userInfo){
            router.push('/user/login')
        }
           if(buyItem){
               const buyItems = [];
               buyItems.push(buyItem)
               setItems(buyItems)
           }else{
            const cartItem = JSON.parse(Cookies.get('cartItem'));
            setCartItem(cartItem)
           }
           
    },[buyItem,userInfo,shippingAddress,router]);
   
    return (
        <div className={styles.confirmshippingdetails}>
           <Head>
             <title>Confirm shipping details</title>
             <meta name="viewport" content="initial-scale=1.0, width=device-width" />
           </Head>
           <Navbar />
           <CheckoutSteps activeStep={2} />
           <div className={styles.confirmshippingdetails_main}>
            <div className={styles.confirmshippingdetails_left}>
             {
                shippingDetails &&
                <div className={styles.confirmshippingdetails_left_top}>
                   <h2 className={styles.confirmshippingdetails_title_text}>Shipping Details</h2>
                   <p className={styles.confirmshippingdetails_info_text}>
                       <span className={styles.confirmshippingdetails_info_text_span}>Name:</span> { shippingDetails.fullName }
                   </p>
                   <p className={styles.confirmshippingdetails_info_text}>
                       <span className={styles.confirmshippingdetails_info_text_span}>Phone:</span> { shippingDetails.phoneNumber }
                   </p>
                   <p className={styles.confirmshippingdetails_info_text}>
                       <span className={styles.confirmshippingdetails_info_text_span}>Address:</span> { shippingDetails.address }
                   </p>
                </div>
             }

                <div className={styles.confirmshippingdetails_left_top}>
                <h2 className={styles.confirmshippingdetails_title_text}>Items</h2> 

                    {
                        buyItem ? 
                        items?.map(item=>(
                            <div key={item.product._id} className={styles.items_info}>
                        <div className={styles.items_info_left}>
                            <Image  
                              width={50}
                              height={40}
                              className={styles.items_info_img}
                              src={`${process.env.NEXT_PUBLIC_URL}/upload/${item.product.images[0]}`}
                              alt="item"
                              />
                            <p className={styles.confirmshippingdetails_info_text}>
                                {item.product.name}
                            </p>
                        </div>
                        <div className={styles.items_info_right}>
                            <p className={styles.confirmshippingdetails_info_text}>
                                <span>{item.itemQuantity} X Rs.{item.product.price}</span> = <b>Rs.{item.itemQuantity * item.product.price}</b>
                            </p>
                        </div>
                    </div>
                        ))
                        :
                        <div>
                       { cartItem?.length > 0 && cartItem.map((item,i)=>(
                            <div key={i} className={styles.items_info}>
                        <div className={styles.items_info_left}>
                            <Image  
                              width={50}
                              height={40}
                              className={styles.items_info_img}
                              src={`${process.env.NEXT_PUBLIC_URL}/upload/${item.productImage}`}
                              alt="item"
                              />
                            <p className={styles.confirmshippingdetails_info_text}>
                                {item.productName}
                            </p>
                        </div>
                        <div className={styles.items_info_right}>
                            <p className={styles.confirmshippingdetails_info_text}>
                                <span>{item.quantity} X Rs.{item.productPrice}</span> = <b>Rs.{item.quantity * item.productPrice}</b>
                            </p>
                        </div>
                    </div>
                        ))
                       }
                       </div>
                    }     
                    </div>     
                </div>
            <div className={styles.confirmshippingdetails_right}>
                <h2 className={styles.confirmshippingdetails_title_text}>
                    Order Summary
                </h2>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",width:"190px"}}>
                    <p className={styles.confirmshippingdetails_info_text}>
                       Subtotal 
                    </p>
                    {
                        buyItem ?
                        <p style={{flexGrow:"1",textAlign:"right",fontWeight:"600",fontFamily:"Roboto"}}>
                           {`Rs.${items.reduce(
                           (acc, item) => acc + item.itemQuantity * item.product.price,
                           0
                         )}`}
                        </p>
                        : <p style={{flexGrow:"1",textAlign:"right",fontWeight:"600",fontFamily:"Roboto"}}>
                           {`Rs.${cartItem.reduce(
                           (acc, item) => acc + item.quantity * item.productPrice,
                           0
                         )}`}
                        </p>
                    }
                  </div>
                   
                   <div style={{display:"flex",alignItems:"center",width:"190px",borderBottom:"2px solid grey"}}>
                    <p className={styles.confirmshippingdetails_info_text}>
                       Shipping charge 
                    </p>
                    <p style={{flexGrow:"1",textAlign:"right",fontWeight:"600",fontFamily:"Roboto"}}>Rs.50</p>
                   </div>

                    <div style={{display:"flex",alignItems:"center",width:"190px"}}>
                      <p className={styles.confirmshippingdetails_info_text}>
                        Total 
                      </p>
                      {
                        buyItem ?
                        <p style={{flexGrow:"1",textAlign:"right",fontWeight:"600",fontFamily:"Roboto"}}>
                           {`Rs.${items.reduce(
                           (acc, item) => acc + item.itemQuantity * item.product.price,
                           50
                         )}`}
                        </p>
                        : <p style={{flexGrow:"1",textAlign:"right",fontWeight:"600",fontFamily:"Roboto"}}>
                           {`Rs.${cartItem.reduce(
                           (acc, item) => acc + item.quantity * item.productPrice,
                           50
                         )}`}
                        </p>
                    }
                    </div>
                  
                    <button onClick={handleContinue} className={styles.confirmshippingdetails_btn}>
                        Proceed to payment
                    </button>
                    
                </div>
            </div>
           </div>

           <Footer />
           
        </div>
    
    )
}

export default Confirmshippingdetails
