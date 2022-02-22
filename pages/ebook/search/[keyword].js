import { useRouter } from 'next/router';
import {useState} from 'react';
import EbookCard from '../../../components/EbookCard';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Ebook from '../../../models/Ebook';
import styles from '../../../styles/Search.module.css';
import { ApiFeatures } from '../../../utils/apiFeatures';
import db from '../../../utils/db';
import Head from 'next/head'

const SearchProduct = ({ebooks}) => {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        router.push(`/ebook/search/${keyword}`);
      } else {
        router.push("/ebook");
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
                  ebooks
                  ? ebooks.map(ebook => (
                    <EbookCard 
                    key={ebook._id}
                    ebookCardImage={ebook.coverImage? `${process.env.NEXT_PUBLIC_URL}/ebook/${ebook.coverImage}` :"https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="}
                    ebookCardAuthor={ebook.authorName}
                    ebookLink={ebook._id}
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
    const apiFeatures = new ApiFeatures(Ebook.find().lean(), query)
    .search()
    .filter();
 
    const ebooks = await apiFeatures.query;
    await db.disconnect();

    if (!apiFeatures || !ebooks) {
        return {
           notFound: true,
        }
     }

    return { props: { ebooks: ebooks.map(db.convertDocToObj) } }
  }

export default SearchProduct
