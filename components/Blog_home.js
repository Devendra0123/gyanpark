import styles from "../styles/Home.module.css"
import BlogCard from "./BlogCard";
import Link from "next/link"
function Blog_home({blogs}) {
    return (
        <div className={styles.blog_home}>
            <div className={styles.blog_home_info}>
                <h2 className={styles.blog_home_info_title}>
                    Blog
                </h2>
            </div>

            <div className={styles.blog_home_body}>
             {
                blogs?.length > 0 && blogs.map(blog => (
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

            <div className={styles.blog_home_cta}>
                <Link href="/blog" passHref>
                    <button className={styles.blog_home_cta_btn}>
                        See More Blog
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Blog_home
