import styles from "../styles/Store.module.css";
import ItemCard from "./ItemCard";
import Link from "next/link";

function Store({products}) {
    return (
        <div className={styles.store}>
            <div className={styles.store_info}>
                <h2 className={styles.store_info_title}>Our Store</h2>
            </div>

            <div className={styles.store_body}>
                <div className={styles.store_body_storeItems}>
                  {
                      products?.length > 0 && products.map((product)=>(
                          <div key={product._id} style={{marginLeft:'15px'}}>
                          <ItemCard 
                             cardTitle={product.name}
                             cardImage={product.images[0]}
                             itemPrice={product.price}
                             product_id={product._id}
                            />
                          </div>
                     
                      ))
                  }
                </div>
            </div>

            <div className={styles.store_cta}>
                <Link href="/store" passHref>
                    <button className={styles.store_ctaBtn}>Visit Store</button>
                </Link>
            </div>
        </div>
    )
}

export default Store;
