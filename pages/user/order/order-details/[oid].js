import { useContext, useEffect, useState } from "react";
import { Store } from "../../../../utils/store";
import {useRouter} from 'next/router';
import db from "../../../../utils/db";
import Order from "../../../../models/Order";
import styles from "../../../../styles/Order.module.css";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import Image from 'next/image';
import axios from 'axios';

const OrderDetail = ({orders}) => {
    const router = useRouter()
    const { state } = useContext(Store);
    const [order,setOrder] = useState([]);
    const [deliveryStatus,setDeliveryStatus] = useState('')
    const [paymentStatus,setPaymentStatus] = useState('')
    const {userInfo} = state;

    useEffect(()=>{
     if(!userInfo){
       router.push('/user/login')
     }
     setOrder(orders)
    },[]);

    const handleDelivery = async(orderId)=>{
      try{
        const {data} = await axios.post('/api/order/order-delivery',{
          orderId
        });
        setDeliveryStatus(data.message);
      }
      catch(err){
        setDeliveryStatus('')
      }
    }

    const handleOrderPayment = async(orderId)=>{
      try{
        const {data} = await axios.post('/api/order/order-payment',{
          orderId
        });
        setPaymentStatus(data.message);
      }
      catch(err){
        setPaymentStatus('')
      }
    }
 
    return (
        <div className={styles.order}>
          <Navbar /> 
            {
              order && 
              <div className={styles.order_details_cotainer}>
              {
                (userInfo?.isAdmin == true && order.isPaid == false) &&
                <button onClick={()=>handleOrderPayment(order._id)} style={{padding:'5px 7px',borderRadius:'10px',border:'2px solid blue',color:'blue'}}>
                  { deliveryStatus ? deliveryStatus : 'Paid'}
                </button>
              }

              {
                (userInfo?.isAdmin == true && order.isDelivered == false) &&
                <button onClick={()=>handleDelivery(order._id)} style={{padding:'5px 7px',marginTop:'10px',borderRadius:'10px',border:'2px solid blue',color:'blue'}}>
                  { deliveryStatus ? deliveryStatus : 'Delivered'}
                </button>
              }
                 <div style={{width:'100%',padding:'10px'}}>
                 {
                   order.deliveredAt &&
                   <p> Delivered Date : { order.deliveredAt } </p>
                 }
                  <p> Ordered Date : { order.createdAt } </p>
                  <p> Order Number : {order._id}</p>
                  <p> Total Price : Rs.{order.totalPrice}</p>
                  <p> Shipping Price : Rs.{order.shippingPrice}</p>
                  <p> Paid : {order.isPaid == false ? 'Not Paid' : 'Paid'}</p>
                  <p> Delivered : {order.isDelivered == false ? 'No' : 'Delivered'}</p>
                 </div>
 
                  <table className={`${styles.orderTable} ${styles.orderDetail_table}`}>
                  <thead>
                  <tr className={styles.tr}>
                  <th className={styles.th}>Image</th>
                  <th className={styles.th}>Item Name</th>
                  <th className={styles.th}>Item Price</th>
                  <th className={styles.th}>Item Quantity</th>
                  <th className={styles.th}>Total Price</th>
                  </tr>
                  </thead>
              
                  {order.orderItems?.map((item,i)=>(
                     <tbody key={i}>
                     <tr className={styles.tr}>
                        <td>
                          <Image src={`/upload/${item.image}`} width={50} height={60} />
                        </td>
                        <td className={styles.td}> {item.name} </td>
                        <td className={styles.td}> Rs.{item.price} </td>
                        <td className={styles.td}> {item.quantity} </td>
                        <td className={styles.td}> Rs.{item.price * item.quantity} </td>
                      </tr>
                     </tbody>
                  ))}
                  </table>
                  <div style={{width:'100%',padding:'10px'}}>
                    <p>Name: {order?.shippingAddress?.fullName} </p>
                    <p>Address: {order?.shippingAddress?.address} </p>
                    <p>Phone Number: {order?.shippingAddress?.phoneNumber} </p>
                  </div>
              </div>
            
            }   
            <Footer />      
        </div>
    )
}

export async function getServerSideProps({query}) {
  await db.connect();
  const orderdesc = await Order.findById(query.oid).select('-user').lean()
  await db.disconnect();

  if (!orderdesc) {
      return {
         notFound: true,
      }
   }
   const order = db.convertDocToObj(orderdesc);
   const orderDetails = {
    _id: order._id,
    orderItems: order.orderItems.map(item=>{
        return {
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price
        }
    }),
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    itemsPrice: order.itemsPrice,
    shippingPrice: order.shippingPrice,
    totalPrice: order.totalPrice,
    isPaid: order.isPaid,
    isDelivered: order.isDelivered,
    deliveredAt: order?.deliveredAt ? order?.deliveredAt.toString() : null,
    createdAt: order.createdAt
}
  return { props: { orders: orderDetails }
}
}

export default OrderDetail