import styles from "../../../styles/Blog.module.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import SmallPostCard from "../../../components/SmallPostCard";
import Blog from "../../../models/Blog";
import db from "../../../utils/db";
import Head from 'next/head'
import Image from 'next/image';

const SingleBlog = ({blog,blogs}) => {
  
    return (
        <div className={styles.singleBlog}>
         <Head>
           <title>{blog?.title}</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
            <Navbar />
            <div className={styles.singleBlog_container}>
               
                {
                    blog &&
                    <div className={styles.singleBlog_container_left}>
                    <div className={styles.singleBlog_container_left_hero}>
                      <div>
                       <Image className={styles.singleBlog_container_left_hero_img} src={`${process.env.NEXT_PUBLIC_URL}/blog/${blog.titleImage}`} width={1000} height={300} alt='image' />
                       </div>
                       <div className={styles.singleBlog_container_left_hero_title}>
                         <h1 className={styles.blogTitle_text}>
                             {blog.title}
                         </h1>
                         <p>{ blog.createdAt }</p>
                       </div>
                      
                       <p></p>
                    </div>

                    <div className={styles.singleBlog_container_left_details}>
                     
                     {
                         blog.description.map((desc,i)=>(
                            <div key={i} className={styles.details_info}>
                              {
                                desc.title &&
                                <h3 className={styles.details_info_title}>
                                   {desc.title}
                                </h3>
                              }

                            {
                              desc.images[0] && 
                              <Image className={styles.details_info_img} src={`${process.env.NEXT_PUBLIC_URL}/blog/${desc.images[0]}`} width={1000} height={300} alt='image' />
                            }
                          
                            <div className={styles.detail_description}>
                             {
                               desc.subtitle &&
                               <h4 className={styles.sub_title}>
                                  {desc.subtitle}
                              </h4>
                             }
                             
                              <p className={styles.detail_paragraph}>
                                { desc.descDetail }
                              </p>
                            </div>
                        </div>
                         ))
                     }
                       
                    </div>
                    </div>
                }
                               
                <div className={styles.singleBlog_container_right}>

                {
                    blogs?.map(blog=>(
                        <SmallPostCard
                        key={blog._id}
                      smallPostCard_title={blog.title}
                      smallPostCard_desc={blog.description[0].descDetail}
                      smallPostCard_image={`${process.env.NEXT_PUBLIC_URL}/blog/${blog.titleImage}`}
                      handleLink = {`/blog/blog-detail/${blog._id}`}
                     />
                    ))
                }
                   
                </div>
            </div>

            <Footer />
        </div>
    )
}

export async function getStaticProps(ctx) {
    const bid = await ctx.params?.bid;
    await db.connect();
    const blogs = await Blog.find({ _id: { $nin: bid }}).limit(8).lean();
    const blogItem = await Blog.findById(bid).lean();
    await db.disconnect();
    
    const blog = db.convertDocToObj(blogItem);
   
    const blogItems = blogs?.map(blog => db.convertDocToObj(blog));
  
    const blogLists = blogItems?.map(item=>{
        return {
            _id: item?._id ? item._id : '',
            title: item?.title ? item.title : '',
            titleImage: item?.titleImage ? item.titleImage : '',
            category: item?.category ? item.category : '',
            description: item?.description?.map(desc=>{
                return {
                  title: desc?.title ? desc.title : '',
                  subtitle: desc?.subtitle ? desc.subtitle : '',
                  descDetail: desc?.descDetail ? desc.descDetail : '',
                  images: desc?.images ? desc.images : ''
                }
            })
        }});

    const blogDetails = {
            _id: blog?._id ? blog._id : '',
            title: blog?.title ? blog.title : '',
            titleImage: blog?.titleImage ? blog.titleImage : '',
            category: blog?.category ? blog.category : '',
            description: blog?.description?.map(desc=>{
                return {
                  title: desc?.title ? desc.title : '',
                  subtitle: desc?.subtitle ? desc.subtitle : '',
                  descDetail: desc?.descDetail ? desc.descDetail : '',
                  images: desc?.images ? desc.images : ''
                }
            }),
            createdAt: blog.createdAt
          }
     return {
       props: {
           blogs : blogLists, 
         blog: blogDetails
       },
       revalidate: 10
     }
   }

   export async function getStaticPaths() {
    await db.connect();
    const blogs = await Blog.find({}).lean();
    await db.disconnect();
    return {
      paths: blogs.map(blog=>{
        return { params: { bid: blog._id.toString() } }
      }),
      fallback: true 
    };
  }

export default SingleBlog
