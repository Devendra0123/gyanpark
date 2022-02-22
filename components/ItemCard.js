import styles from "../styles/Store.module.css";
import Image from 'next/image';
import Link from 'next/link';

function ItemCard({cardTitle,cardImage,itemPrice,product_id}) {
    return (
      <Link href={`/store/product/product-details/${product_id}`} passHref>
        <div className={styles.card}>
        <div className={styles.polygon}>        
             <Image src={`${process.env.NEXT_PUBLIC_URL}/upload/${cardImage}`} alt="image" className={styles.image} layout='fill' />    
          <div className={styles.add}>+</div>
          <div className={styles.price}>Rs.{itemPrice}</div>
        </div>
        <h3 className={styles.card_title}>
          {cardTitle}
        </h3>
      </div>
      </Link>
    )
}

export default ItemCard
