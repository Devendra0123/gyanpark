import React, { useState } from "react";
import styles from "../styles/ProductDetail.module.css";
import Image from 'next/image'
const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className={styles.slider}>
      <div className={styles.leftArrow} onClick={prevSlide}>
        &larr;
      </div>
      <div className={styles.rightArrow} onClick={nextSlide}>
        &rarr;
      </div>
      {slides.map((slide, index) => {
        return (
          <div
           style={{position:'relative'}}
            className={`${styles.slide} ${index === current &&  styles.active }`}
            key={index}
          >
            {index === current && (
              <Image src={`${process.env.NEXT_PUBLIC_URL}/upload/${slide}`} alt="image" width={300} height={370} objectFit="cover" className={styles.image} />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
