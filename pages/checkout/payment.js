import styles from "../../styles/Checkout.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CheckoutSteps from "../../components/CheckoutSteps";
import { Store } from '../../utils/store';
import { useContext, useEffect, useState } from "react";
import {useRouter} from 'next/router'
import axios from 'axios';
import Cookies from 'js-cookie';
import LoadingBar from "../../components/LoadingBar";
import Head from 'next/head'

const Payment = () => {
  const router = useRouter();
  const [price,setPrice] = useState(null);
  const [cashOnDelivery,setCashOnDelivery] = useState(false);
  const [opening, setOpening] = useState(false);
  const { state } = useContext(Store);
  const {buyItem,userInfo,shippingAddress} = state;
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(false);

  const handleCross = () => {
    setOpening(false);
    setCashOnDelivery(false);
  };

  // cash on delivery popup
  const handleCashOnDelivery = ()=>{
    setCashOnDelivery(true);
    setOpening(true)
  }

  // cash on delivery order
  const handleCahOnDeliveryOrder =async()=>{
    try {
      if(buyItem){
        setLoading(true);
        const orderDetails =  {
          user: userInfo?._id,
          orderItems: [{
            name:items?.product.name,
            price: items?.product.price,
            quantity: items?.itemQuantity,
            image: items?.product.images[0]
          }],
          shippingAddress,
          paymentMethod: cashOnDelivery,
          itemsPrice: price-50,
          shippingPrice: 50,
          totalPrice: price,
        }
   
        const { data } = await axios.post(
          '/api/order/create-order',
          orderDetails
        );
        Cookies.remove('buyItem');
        setLoading(false);
        router.push(`/checkout/checkout-success-page`);
      }
      else{
        setLoading(true);
        const orderDetails =  {
          user: userInfo?._id,
          orderItems: items?.map(item => {
            return {
              name:item?.productName,
              price: item?.productPrice,
              quantity: item?.quantity,
              image: item?.productImage
            }
          }),
          shippingAddress,
          paymentMethod: cashOnDelivery,
          itemsPrice: price-50,
          shippingPrice: 50,
          totalPrice: price,
        }
    
        const { data } = await axios.post(
          '/api/order/create-order',
          orderDetails
        );
        Cookies.remove('buyItem');
        setLoading(false);
        router.push(`/checkout/checkout-success-page`);
      }
    }
     catch (err) {
      setLoading(false);
      router.push(`/checkout/checkout-failure-page`);
    }
  }

  useEffect(()=>{
    if(!userInfo){
      router.push('/user/login')
  }
      if(buyItem){

        const total = buyItem.itemQuantity * buyItem.product.price;
        setPrice(total + 50);
        setItems(buyItem);
      }else{
        const cartItems = JSON.parse(Cookies.get('cartItem'));
        const totalAmount = cartItems?.reduce(
          (acc, item) => acc + item.quantity * item.productPrice,
          50
        );
        setPrice(totalAmount);
        setItems(cartItems);
      }
  },[buyItem,router,userInfo])

    return (
        <div className={styles.payment}>
        <Head>
           <title>Payment</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
          <Navbar />
          <CheckoutSteps activeStep={3} />
          {opening &&  <div style={{opacity:"60%",zIndex:"9",position:"absolute",width:"100%",height:"300vh",backgroundColor:"grey"}}></div>}
          <div className={styles.payment_option}>
             <h3 className={styles.payment_option_title}>
               Select payment method
             </h3>
             <div className={styles.moneyIcon}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 12c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm.5 8.474v.526h-.5v-.499c-.518-.009-1.053-.132-1.5-.363l.228-.822c.478.186 1.114.383 1.612.27.574-.13.692-.721.057-1.005-.465-.217-1.889-.402-1.889-1.622 0-.681.52-1.292 1.492-1.425v-.534h.5v.509c.362.01.768.073 1.221.21l-.181.824c-.384-.135-.808-.257-1.222-.232-.744.043-.81.688-.29.958.856.402 1.972.7 1.972 1.773.001.858-.672 1.315-1.5 1.432zm1.624-10.179c1.132-.223 2.162-.626 2.876-1.197v.652c0 .499-.386.955-1.007 1.328-.581-.337-1.208-.6-1.869-.783zm-2.124-5.795c2.673 0 5-1.007 5-2.25s-2.327-2.25-5-2.25c-2.672 0-5 1.007-5 2.25s2.328 2.25 5 2.25zm.093-2.009c-.299-.09-1.214-.166-1.214-.675 0-.284.334-.537.958-.593v-.223h.321v.211c.234.005.494.03.784.09l-.116.342c-.221-.051-.467-.099-.708-.099l-.072.001c-.482.02-.521.287-.188.399.547.169 1.267.292 1.267.74 0 .357-.434.548-.967.596v.22h-.321v-.208c-.328-.003-.676-.056-.962-.152l.147-.343c.244.063.552.126.828.126l.208-.014c.369-.053.443-.3.035-.418zm-11.093 13.009c1.445 0 2.775-.301 3.705-.768.311-.69.714-1.329 1.198-1.899-.451-1.043-2.539-1.833-4.903-1.833-2.672 0-5 1.007-5 2.25s2.328 2.25 5 2.25zm.093-2.009c-.299-.09-1.214-.166-1.214-.675 0-.284.335-.537.958-.593v-.223h.321v.211c.234.005.494.03.784.09l-.117.342c-.22-.051-.466-.099-.707-.099l-.072.001c-.482.02-.52.287-.188.399.547.169 1.267.292 1.267.74 0 .357-.434.548-.967.596v.22h-.321v-.208c-.329-.003-.676-.056-.962-.152l.147-.343c.244.063.552.126.828.126l.208-.014c.368-.053.443-.3.035-.418zm4.003 8.531c-.919.59-2.44.978-4.096.978-2.672 0-5-1.007-5-2.25v-.652c1.146.918 3.109 1.402 5 1.402 1.236 0 2.499-.211 3.549-.611.153.394.336.773.547 1.133zm-9.096-3.772v-.651c1.146.917 3.109 1.401 5 1.401 1.039 0 2.094-.151 3.028-.435.033.469.107.926.218 1.37-.888.347-2.024.565-3.246.565-2.672 0-5-1.007-5-2.25zm0-2.5v-.652c1.146.918 3.109 1.402 5 1.402 1.127 0 2.275-.176 3.266-.509-.128.493-.21 1.002-.241 1.526-.854.298-1.903.483-3.025.483-2.672 0-5-1.007-5-2.25zm11-11v-.652c1.146.918 3.109 1.402 5 1.402 1.892 0 3.854-.484 5-1.402v.652c0 1.243-2.327 2.25-5 2.25-2.672 0-5-1.007-5-2.25zm0 5v-.652c.713.571 1.744.974 2.876 1.197-.661.183-1.287.446-1.868.783-.622-.373-1.008-.829-1.008-1.328zm0-2.5v-.651c1.146.917 3.109 1.401 5 1.401 1.892 0 3.854-.484 5-1.401v.651c0 1.243-2.327 2.25-5 2.25-2.672 0-5-1.007-5-2.25z"/></svg>
             </div>
             
             <div onClick={handleCashOnDelivery} className={styles.cashOnDelivery}>
               <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24"><path d="M12.164 7.165c-1.15.191-1.702 1.233-1.231 2.328.498 1.155 1.921 1.895 3.094 1.603 1.039-.257 1.519-1.252 1.069-2.295-.471-1.095-1.784-1.827-2.932-1.636zm1.484 2.998l.104.229-.219.045-.097-.219c-.226.041-.482.035-.719-.027l-.065-.387c.195.03.438.058.623.02l.125-.041c.221-.109.152-.387-.176-.453-.245-.054-.893-.014-1.135-.552-.136-.304-.035-.621.356-.766l-.108-.239.217-.045.104.229c.159-.026.345-.036.563-.017l.087.383c-.17-.021-.353-.041-.512-.008l-.06.016c-.309.082-.21.375.064.446.453.105.994.139 1.208.612.173.385-.028.648-.36.774zm10.312 1.057l-3.766-8.22c-6.178 4.004-13.007-.318-17.951 4.454l3.765 8.22c5.298-4.492 12.519-.238 17.952-4.454zm-2.803-1.852c-.375.521-.653 1.117-.819 1.741-3.593 1.094-7.891-.201-12.018 1.241-.667-.354-1.503-.576-2.189-.556l-1.135-2.487c.432-.525.772-1.325.918-2.094 3.399-1.226 7.652.155 12.198-1.401.521.346 1.13.597 1.73.721l1.315 2.835zm2.843 5.642c-6.857 3.941-12.399-1.424-19.5 5.99l-4.5-9.97 1.402-1.463 3.807 8.406-.002.007c7.445-5.595 11.195-1.176 18.109-4.563.294.648.565 1.332.684 1.593z"/></svg>
               <p style={{fontFamily:"Roboto",marginLeft:"10px"}}>
                 Cash on delivery
               </p>
             </div>
           </div>
                {
                  cashOnDelivery && 
                  <div className={styles.cashOnDelivery_popup}>
                    <p style={{textAlign:'center',fontFamily:'Roboto',fontSize:'16px'}}>
                      Do you want to place order by cash on delivery?
                    </p>
                    <div style={{marginTop:'10px'}}>
                      <button onClick={handleCross} style={{padding:'5px 10px',fontSize:'17px',borderRadius:'5px',border:'none',backgroundColor:'grey',color:'white'}}>No</button>
                      <button disabled={loading === true ? true : false} onClick={handleCahOnDeliveryOrder} style={{padding:'5px 10px',fontSize:'17px',marginLeft:'10px',borderRadius:'5px',border:'none',backgroundColor:'green',color:'white'}}>
                        {loading === true ? <LoadingBar /> : "Yes"}
                      </button>
                    </div>
                    <div onClick={handleCross} className={styles.cross}>
                       <div className={styles.line1}></div>
                       <div className={styles.line2}></div>
                     </div>
                  </div>
                }

                <Footer />
                
        </div>
    )
}

export default Payment
