import styles from "../../styles/Blog.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";
import Blog from "../../models/Blog";
import db from "../../utils/db";
import { useState } from "react";
import Head from 'next/head'

const Slog = ({blogs}) => {

    const blogCategory = ["All","Personal","Relationship","Life","Travel","Food","Education"];
    
    const [blogList,setBlogList] = useState([]);

    const handleCategorySearch = async(category)=>{
        if(category == 'All'){
          setBlogList(blogs);
        }else{
          const list = blogs?.filter(e => e.category == category);
          setBlogList(list);
        }
      }

    return (
        <div className={styles.topDivClass}>
        <Head>
          <title>Blogs</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
            <Navbar activePage={3}/>
            
            <div className={styles.blog_category}>
                {
                    blogCategory.map((category,i)=>(
                        <button onClick={()=> handleCategorySearch(category)} className={styles.blog_category_btn} key={i}>{category}</button>
                    ))
                }
            </div>
            <div className={styles.blog_items}>

              {
                blogList?.length > 0 ?
                blogList.map(blog => (
                    <BlogCard 
                    key={blog._id}
                    blogCard_title={ blog.title }
                    blogCard_desc={blog.description[0].descDetail}
                    blogCard_link={`/blog/blog-detail/${blog._id}`}
                    blogCard_image={`${process.env.NEXT_PUBLIC_URL}/blog/${blog.titleImage}`}
                  />
                ))
                :
                  blogs?.map(blog=>(
                    <BlogCard 
                    key={blog._id}
                    blogCard_title={ blog.title }
                    blogCard_desc={blog.description[0].descDetail}
                    blogCard_link={`/blog/blog-detail/${blog._id}`}
                    blogCard_image={`${process.env.NEXT_PUBLIC_URL}/blog/${blog.titleImage}`}
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
    const blogItems = await Blog.find({}).lean();
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
         blogs: blogs
       },
       revalidate: 10,
     }
   }

export default Slog
