import { useRouter } from 'next/router';
import {useState} from 'react';
import Footer from '../../../components/Footer';
import ItemCard from '../../../components/ItemCard';
import Navbar from '../../../components/Navbar';
import Product from '../../../models/Product';
import styles from '../../../styles/Search.module.css';
import { ApiFeatures } from '../../../utils/apiFeatures';
import db from '../../../utils/db';
import Head from 'next/head'

const SearchProduct = ({products}) => {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        router.push(`/store/product/${keyword}`);
      } else {
        router.push("/store");
      }
    }
    return (
        <div className={styles.searchProduct}>
          <Head>
            <title>{router.query.keyword}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
            <Navbar />

            <div className={styles.store_page_searchBar}>
              <form onSubmit={searchSubmitHandler} className={styles.store_page_searchBar_searchBox}>         
                <input
                  className={styles.store_page_search_input} 
                  type="text" 
                  placeholder="Search a product ..."
                  value = {keyword}
                  onChange={(e) => setKeyword(e.target.value)} 
                 />
                <input className={styles.store_page_search_btn} type="submit" value="Search" />
              </form>
            </div>
            
            <div className={styles.store_page_storeItems}>
              {
                  products
                  ? products.map(product => (
                    <ItemCard 
                       key={product._id}
                       cardTitle={product.name}
                       cardImage={product.images[0]}
                       itemPrice={product.price}
                       product_id={product._id}
                   />
                  ))
                  : <h1>Wait...</h1>
              }              
            </div>
            <Footer />
        </div>
    )
}

export async function getServerSideProps({query}) {
    await db.connect();
    const apiFeatures = new ApiFeatures(Product.find().select('-reviews').lean(), query)
    .search()
    .filter();
 
    const products = await apiFeatures.query;
    await db.disconnect();

    if (!apiFeatures || !products) {
        return {
           notFound: true,
        }
     }

    return { props: { products: products.map(db.convertDocToObj) } }
  }

export default SearchProduct
