import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CartItem from "../../../components/CartItemCard";
import styles from "../../../styles/Cart.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from "react";
import db from "../../../utils/db";
import Cart from '../../../models/Cart';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Store } from "../../../utils/store";

const Sart = ({cartItems}) => {
  const router = useRouter();
  const { state } = useContext(Store);
  const {userInfo} = state;
  const [cartProduct,setCartProduct] = useState([]);

  const handleCheckout = ()=>{
      Cookies.remove('buyItem');
      Cookies.set('cartItem',JSON.stringify(cartItems));
      router.push(`/checkout/shipping-info?user=${userInfo._id}`);
  }

  // Remove from cart
  const removeFromCart = async(productId)=>{
    const {uid} = router.query;
    try{
      const {data} = await axios.post('/api/cart/remove-item',{
         user: uid,
         productId: productId
      })
      if(data?.cartItems){
        console.log('Everything is fine');
        setCartProduct(data.cartItems)
      }
    }catch(err){
     console.log(err)
    }
  }

  useEffect(()=>{
    if(!userInfo){
      router.push('/')
    }
    setCartProduct(cartItems);
  },[])
    return (
        <div className={styles.cart}>
           <Navbar />
        {
          cartProduct?.length > 0 ? 
          <div className={styles.cartPage}>
            <div className={styles.cartHeader}>
              <p className={styles.cartHeader_item}>Product</p>
              <p className={styles.cartHeader_item}>Quantity</p>
              <p className={styles.cartHeader_item}>Subtotal</p>
            </div>
                <div className={styles.cartItem}>
                {
                  cartProduct?.map((item,i)=> (
                    <div key={i} className={styles.cartItemDetails}>
                   
                   <CartItem
                    itemName={item.productName}
                    itemPrice={item.productPrice}
                    itemImage={`${process.env.NEXT_PUBLIC_URL}/upload/${item.productImage}`}
                    removeItem={()=>removeFromCart(item.productId)}
                    productId={item.productId}
                   />
                  
                  <div className={styles.cartQuantity}>
                    <span className={styles.cartQty_span}>{ item.quantity }</span>
                  </div>
                  <p style={{fontSize:"16px"}} className={styles.cartSubtotal}>
                      Rs.{item.productPrice * item.quantity}
                  </p>
                  </div>
                  ))
                }                        
                </div>

            <div className={styles.cartGrossProfit}>
              <div className={styles.hr}></div>
              <div className={styles.cartGrossProfitBox}>
                <p style={{fontSize:"16px",fontFamily:"Roboto",fontWeight:"500"}}>Gross Total:</p>
                <p style={{fontSize:"16px",marginLeft:"5px",color:"slateblue",fontWeight:"500",fontFamily:'Roboto',fontWeight:'600'}}>
                  {`Rs.${cartItems?.reduce(
                    (acc, item) => acc + item?.quantity * item?.productPrice,
                    0
                  )}`}
                </p>
              </div>
              <div></div>
              <div className={styles.checkOutBtn}>
                <button onClick={handleCheckout} className={styles.checkOutBtn_btn}>Check Out</button>             
              </div>
            </div>
          </div>
          :<p style={{fontFamily:'Roboto',fontSize:'18px',fontWeight:'600',marginTop:'30px',width:'100%',textAlign:'center'}}> No items in the cart </p>
        }
           <Footer />
        </div>
    )
}

export async function getServerSideProps(ctx) {
  const uid = ctx.params?.uid;
  await db.connect();
  const cartItems = await Cart.findOne({user: uid}).lean();
  await db.disconnect();

  if (!cartItems) {
      return {
         props: {
          cartItems: []
          }
      }
   }

  return { 
    props: {
      cartItems: cartItems?.cartItems?.map(item =>{
          return {
            productId: item.productId,
            quantity: item.quantity,
            productName: item.productName,
            productPrice: item.productPrice,
            productImage: item.productImage
          }
      })
       } }
}

export default Sart
