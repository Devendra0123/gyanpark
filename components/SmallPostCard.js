import styles from "../styles/Blog.module.css";
import Link from 'next/link';
import Image from 'next/image'
const SmallPostCard = ({handleLink,smallPostCard_image,smallPostCard_desc,smallPostCard_title}) => {

    return (
        <Link href={handleLink} passHref>
        <div className={styles.smallPostCard}>
             <h3 className={styles.smallPostCard_title}>
                   {smallPostCard_title}
             </h3>
            <div className={styles.smallPostCard_info}>  
                <p className={styles.smallPostCard_desc}>
                  {`${smallPostCard_desc.substring(0,100)}...`}
                </p>
                <Image className={styles.smallPostCard_img} src={smallPostCard_image} width={100} height={70} alt='image'/>
            </div>
        </div>
        </Link>
    )
}

export default SmallPostCard
