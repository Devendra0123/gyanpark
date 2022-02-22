import Link from "next/link";
import styles from "../styles/Cart.module.css";
import Image from 'next/image';
import { useRouter } from 'next/router';

const CartItem = ({ itemName,productId,itemImage,itemPrice,removeItem }) => {
 const router = useRouter();
 
  const moveToProductDetails = ()=>{
    router.push(`/store/product/product-details/${productId}`);
 }
  return (
        <div className={styles.cartItemCard}>
  
          <Image src={`${itemImage}`} onClick={moveToProductDetails} className={styles.image} width={100} height={120} alt="ssa" />
         
          <div className={styles.cartItemCardInfo}>
            <Link href={`/store/product/product-details/${productId}`} passHref>
               <p className={styles.cartItemCardInfo_name} style={{fontSize:"16px",fontFamily:'Roboto',fontWeight:'600'}}>{itemName}</p>
            </Link>
            <span style={{fontFamily:"Roboto",color:"white",fontSize:"12px",fontWeight:"400"}}>{`Price: Rs.${itemPrice}`}</span>
            <p onClick={removeItem} style={{fontFamily:"Roboto",cursor:"pointer",fontSize:"15px",fontWeight:"500",color:"red"}}>Remove</p>
          </div>
        </div>
    )
}

export default CartItem
