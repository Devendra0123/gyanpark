import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "../../styles/Store.module.css";
import React,{ useState } from "react"
import ItemCard from "../../components/ItemCard";
import Product from "../../models/Product";
import db from "../../utils/db";
import { useRouter } from "next/router";
import Head from 'next/head'

const Store = ({products}) => {
    const router = useRouter();
    const storeCategory = ["All","Medical Entrance Book","Engineering Entrance Book","Philosophy","Religion/Spirituality"]
    const [keyword, setKeyword] = useState("");
    const [productList,setProductList] = useState([])

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        router.push(`/store/product/${keyword}`);
      } else {
        router.push("/store");
      }
    }
    
    const handleCategorySearch = async(category)=>{
      if(category == 'All'){
        setProductList(products);
      }else{
        const list = products?.filter(e => e.category == category);
        setProductList(list);
      }
    }

    return (
        <div className={styles.store_page}>
         <Head>
           <title>Store</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
            <Navbar activePage={2} />

            <div className={styles.store_page_category}>
               {storeCategory.map(category =>(
                   <button key={category} onClick={()=> handleCategorySearch(category)} className={styles.store_page_category_btn}>
                       {category}
                   </button>
               ))}
            </div>
            
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
                productList?.length > 0 ?
                productList.map(product =>(
                  <ItemCard 
                       key={product._id}
                       cardTitle={product.name}
                       cardImage={product.images[0]}
                       itemPrice={product.price}
                       product_id={product._id}
                   />
                ))
                  : products?.map(product => (     
                    <ItemCard 
                       key={product._id}
                       cardTitle={product.name}
                       cardImage={product.images[0]}
                       itemPrice={product.price}
                       product_id={product._id}
                   />
        
                  ))
              }              
            </div>
            <Footer />
        </div>
    )
}

export async function getStaticProps(ctx) {
   await db.connect();
   const products = await Product.find({}).select('-reviews').lean();
   await db.disconnect();
    return {
      props: {
        products: products.map(db.convertDocToObj)
      },
      revalidate: 10,
    }
  }

export default Store
