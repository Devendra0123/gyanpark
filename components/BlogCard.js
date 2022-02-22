import styles from "../styles/Home.module.css";
import Link from "next/link"
import Image from 'next/image'
function BlogCard({blogCard_title,blogCard_desc,blogCard_link,blogCard_image}) {
    return (
        <div className={styles.blogCard}>
           <div className={styles.blogCard_info}>
           <div className={styles.blogCard_title}>
                <h2>
                    {blogCard_title}
                </h2>
            </div>
            <div className={styles.blogCard_desc}>
                <p className={styles.blogCard_desc_text}>
                    {`${blogCard_desc.substring(0,200)}...`}
                </p>
            </div>
            <div className={styles.blogCard_cta}>
                <Link href={blogCard_link} passHref>
                    <button className={styles.blogCard_cta_btn}>
                        Read more
                    </button>
                </Link>
            </div>
           </div>
            <div className={styles.imageContainer}>
                <Image className={styles.blogCard_image} src={`${blogCard_image}`} layout="fixed" width={170} height={100} alt="blogCard_image" />
            </div>
        </div>
    )
}

export default BlogCard
