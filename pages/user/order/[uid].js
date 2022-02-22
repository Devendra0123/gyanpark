import { useContext, useEffect, useState } from "react";
import { Store } from "../../../utils/store";
import {useRouter} from 'next/router';
import db from "../../../utils/db";
import Order from "../../../models/Order";
import styles from "../../../styles/Order.module.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Border = ({order}) => {
    
    const router = useRouter();
    const { state } = useContext(Store);
    const [orders,setOrders] = useState([]);
    const {userInfo} = state;

    const handleOrder = (orderId)=>{
       router.push(`/user/order/order-details/${orderId}`)
    }
    useEffect(()=>{
     if(!userInfo){
       router.push('/user/login')
     }
     setOrders(order)
    },[]);
    return (
        <div className={styles.order}>
          <Navbar />
        <div className={styles.orderHistory}>
        {
          orders?.length > 0 &&
          <table className={styles.orderTable}>
         <thead>
           <tr className={styles.tr}>
             <th className={styles.th}>Order ID</th>
             <th className={styles.th}>Total Price</th>
             <th className={`${styles.th} ${styles.paid}`}>Is Paid</th>
             <th className={`${styles.th} ${styles.delivery}`}>Is Delivered</th>
           </tr>
         </thead>
            {
               orders.map(order=>(
                <tbody key={order._id}>
                  <tr className={styles.tr} onClick={()=> handleOrder(order._id)}>
                  <td className={styles.td}> { order._id } </td>
                   <td className={styles.td}> Rs.{ order.totalPrice } </td>
                   <td className={`${styles.td} ${styles.paid}`}> { order.isPaid == false ? 'No' : 'Yes' } </td>
                   <td className={`${styles.td} ${styles.delivery}`}> { order.isDelivered == false ? 'No' : 'Yes' } </td>
                  </tr>
                </tbody>
              ))
            }
          </table>
        }
        </div>
       
         <Footer />
        </div>
    )
}

export async function getServerSideProps({query}) {
  await db.connect();
  const orders = await Order.find({user:query.uid}).select('-deliveredAt -orderedAt -user -orderItems -itemsPrice -shippingPrice -shippingAddress').lean()
  await db.disconnect();

  const userOrders = orders.map(item => db.convertDocToObj(item)) 
  function compare( a, b ) {
    if ( new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ){
      return 1;
    }
    if ( new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ){
      return -1;
    }
  }

  const orderLists = userOrders.sort(compare);
  if (!orders) {
      return {
         notFound: true,
      }
   }

  return { props: { order: orderLists} }
}

export default Border
