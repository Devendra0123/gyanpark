import Blog_home from "../components/Blog_home";
import Ebook_home from "../components/Ebook_home";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar";
import Quiz_contest_home from "../components/Quiz_contest_home";
import Store from "../components/Store";
import Product from "../models/Product";
import Blog from "../models/Blog";
import Ebook from "../models/Ebook";
import styles from "../styles/Home.module.css";
import db from "../utils/db";
import Footer from "../components/Footer";
import Head from 'next/head'

export default function Home({products,blogs,ebooks}) {
  return (
    <div className={styles.topDivClass}>
     <Head>
        <title>GyanPark</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       <Navbar activePage={1} />
       <div style={{width:'100%'}}>
         <Header />
       </div>
       <div style={{width:'100%'}}>
         <Store products={products} />
       </div>
       <div style={{width:'100%'}}>
          <Ebook_home ebooks={ebooks} />
       </div>
       <div style={{width:'100%'}}>
         <Blog_home blogs={blogs} />
       </div>
       <div style={{width:'100%'}}>
         <Quiz_contest_home />
       </div>
       <div style={{width:'100%'}}>
         <Footer />
       </div>
    </div>
  )
}

export async function getStaticProps(ctx) {
  
  await db.connect();
  const products = await Product.find({}).select('-reviews').limit(6).lean();
  const blogItems = await Blog.find({}).limit(2).lean();
  const ebooks = await Ebook.find({}).limit(4).lean();
  await db.disconnect();

  const blogObj = blogItems.map(item => db.convertDocToObj(item));
  const blogs = blogObj.map(item=>{
    return {
        _id: item._id,
        title: item.title,
        titleImage: item.titleImage,
        category: item.category,
        description: item.description.map(desc=>{
            return {
                title: desc?.title ? desc.title : '',
                subtitle: desc?.subtitle ? desc.subtitle : '',
                descDetail: desc?.descDetail ? desc.descDetail : '',
                images: desc?.images ? desc.images : ''
            }
        })
    }});
   return {
     props: {
       products: products.map(db.convertDocToObj),
       blogs: blogs,
       ebooks: ebooks.map(db.convertDocToObj)
     },
     revalidate: 10,
   }
 }
