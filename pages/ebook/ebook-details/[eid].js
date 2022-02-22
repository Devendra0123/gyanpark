import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import styles from "../../../styles/Ebook.module.css";
import React,{useState} from "react";
import Ebook from '../../../models/Ebook'
import db from "../../../utils/db";
import Image from 'next/image'
import Head from 'next/head'

const EbookDetail = ({ebook}) => {
    const [open,setOpen] = useState(false);
    const [previewImage,setPreviewImage] = useState("");
    const handlePreview = (e)=>{
        setOpen(true);
        setPreviewImage(e.target.name);
    }
    return (
        <div className={styles.ebookDetail}>
        <Head>
          <title>{ebook?.ebookName}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
           {open &&  <div style={{opacity:"60%",zIndex:"9",position:"absolute",width:"100%",height:"400vh",backgroundColor:"grey"}}></div>}

            <Navbar />
            {
                ebook &&
                <div className={styles.ebookDetail_top}>
               
                    <Image 
                        width={230}
                        height={250}
                        className={styles.ebookDetail_top_image}
                        src={ebook.coverImage?`${process.env.NEXT_PUBLIC_URL}/ebook/${ebook.coverImage}`: "https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="}
                        alt="ebook"
                    />
            
                <div className={styles.ebookDetail_top_info}>
                    <p className={styles.ebookDetail_top_info_name}>{ebook.ebookName}</p>
                    <p style={{color:"black"}}>{ebook._id}</p>
                    <p className={styles.ebookDetail_top_info_desc}>
                        <span className={styles.ebookDetail_top_info_desc_span}>Description:</span> {ebook.description}
                    </p>
                    <p className={styles.ebookDetail_top_info_author}>
                        <span className={styles.ebookDetail_top_info_author_span}>Author:</span> {ebook.authorName}
                    </p>
                    <p className={styles.ebookDetail_top_info_publication}>
                        <span className={styles.ebookDetail_top_info_publication_span}>Publication:</span> {ebook.publicationName}
                    </p>
                    <a href={`${process.env.NEXT_PUBLIC_URL}/ebook/${ebook.ebookPdf}`} target = "_blank" rel="noreferrer">
                        <button className={styles.ebookDetail_top_info_openBtn}> Open </button>
                    </a>
                    <a href={`${process.env.NEXT_PUBLIC_URL}/ebook/${ebook.ebookPdf}`} download >
                    <button className={styles.ebookDetail_top_info_downloadBtn}>Download</button>
                    </a>
                </div>
            </div>
            }

            {
                ebook?.previewImage?.length > 0 &&
                <div className={styles.ebookDetail_bottom}>
               <div className={styles.ebookDetail_bottom_preview}>
                   <p className={styles.ebookDetail_bottom_preview_title}>
                       Click on the pages below to preview the e-book 
                   </p>
                   <div className={styles.ebookDetail_bottom_preview_images}>
                     {
                         ebook.previewImage.map((img,i)=>(
                            <Image width={150} height={180} key={i} onClick={handlePreview} className={styles.ebookDetail_bottom_preview_img} 
                               src={`${process.env.NEXT_PUBLIC_URL}/ebook/${img}`}
                               name={img}
                               alt="previewImage"
                              />
                         ))
                     }
                   
                     {
                         open && 
                         <div className={styles.page_preview_dialogue_box}>
                           <div onClick={()=>setOpen(false)} className={styles.cross}>
                              <div className={styles.line1}></div>
                              <div className={styles.line2}></div>
                           </div>
                           <Image 
                              className={styles.page_preview_dialogue_box_img}
                               src={`${process.env.NEXT_PUBLIC_URL}/ebook/${previewImage}`}
                               width={500} height={600}
                               alt="page"
                           />
                         </div>
                     }
                   </div>
               </div>
            </div>
            }
            
            <Footer />
            
        </div>
    )
}


export async function getStaticProps(ctx) {
    const eid = await ctx.params?.eid;
  
    await db.connect();
    const item = await Ebook.findById(eid).lean();
    await db.disconnect();
    const ebook = db.convertDocToObj(item);
 
     return {
       props: {
         ebook: ebook
       },
       revalidate: 10
     }
   }

   export async function getStaticPaths() {
    await db.connect();
    const ebooks = await Ebook.find({}).lean();
    await db.disconnect();
    return {
      paths: ebooks.map(ebook=>{
        return { params: { eid: ebook._id.toString() } }
      }),
      fallback: true 
    };
  }
  
export default EbookDetail
