import styles from "../styles/Ebook.module.css";
import Image from 'next/image'
import Link from 'next/link'

const EbookCard = ({ebookCardImage,ebookCardName,ebookLink}) => {
    return (
      <Link href={`/ebook/ebook-details/${ebookLink}`} passHref>
        <div className={styles.ebookCard}>
            <div className={styles.ebookCard_ring}>
              <div className={styles.ring}></div>
            </div>

           <Image
             width={180}
             height={250}
             className={styles.ebookCard_image}
             src={`${ebookCardImage}`}
             alt="ebook"
           />

           <div className={styles.ebookCard_author}>
             <p className={styles.ebookCard_author_text}>{ebookCardName}</p>
           </div>
        </div>
        </Link>
    )
}

export default EbookCard
