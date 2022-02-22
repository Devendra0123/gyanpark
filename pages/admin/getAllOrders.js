import Order from '../../models/Order'
import db from '../../utils/db'
import styles from "../../styles/Order.module.css";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {useRouter} from 'next/router';

const GetAllUsers = ({orders}) => {
    const router = useRouter();

    const handleOrder = (orderId)=>{
        router.push(`/user/order/order-details/${orderId}`)
     }
  return (
    <div className={styles.allOrders}>
    <Navbar />
    <div style={{marginTop:'30px'}}>
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

export async function getServerSideProps() {
    await db.connect();
    const orders = await Order.find({}).select('-user -deliveredAt -orderedAt -shippingAddress -orderItems').lean();
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

  return { props: { orders: orderLists} }
  }

export default GetAllUsers