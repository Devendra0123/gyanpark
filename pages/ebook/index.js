import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "../../styles/Ebook.module.css";
import React,{useState} from "react"
import EbookCard from "../../components/EbookCard";
import Ebook from '../../models/Ebook'
import db from "../../utils/db";
import { useRouter } from 'next/router';
import Head from 'next/head'

const Dbook = ({ebooks}) => {
  const router = useRouter();
    const ebookCategory = ["All","Medical","Engineering","Entrance Preparation","Others"];
    const [keyword, setKeyword] = useState("");
    const [ebookList,setEbookList] = useState([]);

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        router.push(`/ebook/search/${keyword}`);
      } else {
        router.push("/ebook");
      }
    }

    const handleCategorySearch = async(category)=>{
      if(category == 'All'){
        setEbookList(ebooks);
      }else{
        const list = ebooks?.filter(e => e.category == category);
        setEbookList(list);
      }
    }

    return (
        <div className={styles.ebook}>
         <Head>
           <title>Ebook</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
            <Navbar activePage={4} />
            <div className={styles.ebook_searchBar}>
              <form onSubmit={searchSubmitHandler} className={styles.ebook_searchBar_searchBox}>         
                <input
                  className={styles.ebook_searchBar_search_input} 
                  type="text" 
                  placeholder="Search an ebook ..."
                  value = {keyword}
                  onChange={(e) => setKeyword(e.target.value)} 
                 />
                <input className={styles.ebook_search_btn} type="submit" value="Search" />
              </form>
            </div>
            <div className={styles.ebook_category}>
                {
                    ebookCategory.map((category,i)=>(
                        <button key={i} onClick={()=> handleCategorySearch(category)} className={styles.ebook_category_btn}>{category}</button>
                    ))
                }
            </div>
            <div className={styles.ebook_items}>
              {
                ebookList?.length > 0 ?
                ebookList.map(ebook => (
                  <EbookCard 
                    key={ebook._id}
                    ebookCardImage={ebook.coverImage? `${process.env.NEXT_PUBLIC_URL}/ebook/${ebook.coverImage}` :"https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="}
                    ebookCardName={ebook.ebookName}
                    ebookLink={ebook._id}
                />
                ))
                :
                ebooks?.map(ebook=>(
                    <EbookCard 
                    key={ebook._id}
                    ebookCardImage={ebook.coverImage? `${process.env.NEXT_PUBLIC_URL}/ebook/${ebook.coverImage}` :"https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="}
                    ebookCardAuthor={ebook.authorName}
                    ebookLink={ebook._id}
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
    const ebookArray = await Ebook.find({}).lean();
    await db.disconnect();
     return {
       props: {
         ebooks: ebookArray.map(db.convertDocToObj)
       },
       revalidate: 10,
     }
   }

export default Dbook
