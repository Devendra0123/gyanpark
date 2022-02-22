import styles from "../styles/Store.module.css";
import EbookCard from "./EbookCard";
import Link from "next/link";

function Ebook_home({ebooks}) {

    return (
        <div className={styles.store}>
           <div>
                <h2 className={styles.ebook_info_title}>Ebook</h2>
            </div>
            <div className={styles.store_body} style={{marginTop:'0px'}}>
                <div className={styles.store_body_storeItems}>
                  {
                      ebooks?.length > 0 && ebooks.map((ebook)=>(
                          <div key={ebook._id} style={{marginLeft:'15px'}}>
                          <EbookCard                  
                           ebookCardImage={ebook.coverImage? `${process.env.NEXT_PUBLIC_URL}/ebook/${ebook.coverImage}` :"https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="}
                           ebookCardName={ebook.ebookName}
                           ebookLink={ebook._id}
                       />
                          </div>
                        
                       ))
                  }
                </div>
            </div>

            <div className={styles.store_cta} style={{marginTop:'20px'}}>
                <Link href="/ebook" passHref>
                    <button className={styles.store_ctaBtn}>more ebook</button>
                </Link>
            </div>
        </div>
    )
}

export default Ebook_home;
