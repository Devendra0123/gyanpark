
import styles from "../styles/ProductDetail.module.css";
import axios from 'axios';
import { useContext, useState } from "react";
import { Store } from "../utils/store";
import { useRouter } from "next/router";

const SubmitReviewDialogue = ({ cancel }) => {
  const router = useRouter();
  const [comment,setComment] = useState('');
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleSubmitReview = async()=>{
    setDisable(true);
    const reviewDetails = {
      rating: rating,
      comment: comment,
      user: userInfo,
      productId: router.query.pid
    }

    if(!rating || !comment){
      setDisable(false);
      return;
    }

    try{
      const res = await axios.post('/api/product/submit-review',reviewDetails,
      {headers: {
        'Content-Type': 'application/json'
      }
    });
    setMessage('Your review has been submitted successfully. Thanks!')
    setDisable(true);
    }
    catch(err){
      console.log(err);
      setDisable(false);
    }
  }

    return (
        <div className={styles.submit_review_container}>

        {
          message 
          ? <div className={styles.submit_review}>
          <p style={{color:'white',fontFamily:'Roboto',letterSpacing:'1.2px',paddingRight:'10px',textAlign:'center'}}>{ message }</p>
          <div onClick={cancel} className={styles.cross}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
        </div>
          </div>
          :  <div className={styles.submit_review}>
        <div className={styles.review_ratings}>
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
              onClick={() => setRating(ratingValue)}
            />

            <svg
              style={{
                fillRule: "nonzero",
                fill: ratingValue <= (hover || rating) ? "yellow" : "grey"
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
        </div>
        <div className={styles.review_comment_section}>
          <textarea
            onChange={(e)=> setComment(e.target.value)}
            placeholder="Give your opinion..."
            className={styles.review_comment_section_text}
          />
        </div>
        <button onClick={handleSubmitReview} disabled={disable} className={styles.submit_review_btn}>{disable?'wait':'Submit'}</button>
        <div onClick={cancel} className={styles.cross}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
        </div>
      </div>
        }
     
    </div>
    )
}

export default SubmitReviewDialogue
