import styles from "../styles/ProductDetail.module.css"
import React, { useState } from "react";

const StarRating = ({userRating}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              className={styles.radioBtn}
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(4)}
            />

            <svg
              style={{
                fillRule: "nonzero",
                fill: ratingValue <= userRating? "yellow" : "grey" //write (hover || rating)  instead of 'userRating' for hover and rating effect
              }}
              height="25"
              width="23"
              className={`${styles.star} ${styles.rating}`}
              data-rating="1"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            >
              <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
            </svg>
          </label>
        );
      })}
    </div>
    
    )
}

export default StarRating
