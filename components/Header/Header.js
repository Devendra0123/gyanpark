import React,{useRef} from "react";
import Link from "next/link"
import styles from "../../styles/Header.module.css";
import Image from "next/image"

function Header() {
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
  
    const transformSlide = (val) => {
      const slider = sliderRef.current;
      slider.style.transform = `translate(${val}px,0px)`;
    };
  
    const clickNext = () => {
      transformSlide(-200);
    };
  
    const clickPrev = () => {
      transformSlide(0);
    };
    return (
        <div className={styles.header}>
        <div className={styles.header_top}>
        <div className={styles.header_left}>
            <h1 className={styles.header_left_title}>
                Welcome to our Store...
            </h1>
            <p className={styles.header_left_desc}>
                We ship products all over Kathmandu and nearby districts with money-back guarantee if you don&apos;t like our products.
            </p>
            <Link href="/store" passHref>
               <button className={styles.header_btn}>
                   Visit Store
               </button>
            </Link>
          </div>
          <div className={styles.header_right}>
             <Image
             className={styles.header_heroImage}
             src={`${process.env.NEXT_PUBLIC_URL}/headerHeroImage1283236909.jpg` ? `${process.env.NEXT_PUBLIC_URL}/headerHeroImage1283236909.jpg` :"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1394428708l/17309645.jpg"}
             alt="book"
             width={380}
             height={450}
             priority
              />
          </div>
        </div>
        <div className={styles.header_bottom}>
        <div ref={containerRef} className={styles.container}>
        <div className="slider">
          <div ref={sliderRef} className={styles.slide}>
            <div className={styles.card}>
              <Image
                className={styles.cardImg}
                src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                width={130} height={160} layout='fixed'
                alt=""
              />
            </div>
            <div className={styles.card}>
              <Image
                className={styles.cardImg}
                src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
                width={130} height={160} layout='fixed'
                alt=""
              />
            </div>
            <div className={styles.card}>
              <Image
                className={styles.cardImg}
                src="https://media.istockphoto.com/vectors/01open-book-and-creative-paper-airplanes-teamwork-paper-art-style-vector-id1189849703?k=20&m=1189849703&s=612x612&w=0&h=ViTOSts22Be3PJY0HD_2dLSF31VE5BgD0Sm7ZB96DQ8="
                width={130} height={160} layout='fixed'
                alt=""
              />
            </div>
            <div className={styles.card}>
              <Image
                className={styles.cardImg}
                src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80"
                width={130} height={160} layout='fixed'
                alt=""
              />
            </div>
            <div className={styles.card}>
              <Image
                className={styles.cardImg}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/447px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg"
                width={130} height={160} layout='fixed'
                alt=""
              />
            </div>
            <div className={styles.card}>
              <Image
                className={styles.cardImg}
                src="https://images.idgesg.net/images/article/2020/07/stack_of_books_one_open_scattering_flying_letters_language_reading_education_dictionary_by_domin_domin_gettyimages-157719194_abstract_binary_by_aleksei_derin_gettyimages-914850254_cso_2400x1600-100853104-large.jpg?auto=webp&quality=85,70"
                width={130} height={160} layout='fixed'
                alt=""
              />
            </div>
            <div className={styles.card}>
              <Image
                className={styles.cardImg}
                src="https://media.istockphoto.com/vectors/01open-book-and-creative-paper-airplanes-teamwork-paper-art-style-vector-id1189849703?k=20&m=1189849703&s=612x612&w=0&h=ViTOSts22Be3PJY0HD_2dLSF31VE5BgD0Sm7ZB96DQ8="
                width={130} height={160} layout='fixed'
                alt=""
              />
            </div>
            <div className={styles.card}>
              <Image
                className={styles.cardImg}
                src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                width={130} height={160} layout='fixed'
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div onClick={clickNext} id={styles.nextbutton}></div>
        <div onClick={clickPrev} id={styles.previousbutton}></div>
        </div>
        </div>
    )
}

export default Header
