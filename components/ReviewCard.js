import styles from "../styles/ProductDetail.module.css";
import StarRating from "./StarRating";

const ReviewCard = ({reviewUser_name,reviewUser_opinion,userReviewRating}) => {
    return (
        <div className={styles.reviewCard}>
            <div className={styles.reviewCard_userInfo}>
               <h1 className={styles.user_letter}>
                    {reviewUser_name.charAt(0)}
               </h1>
                <p className={styles.reviewCard_userInfo_name}>
                  {reviewUser_name}
                </p>
            </div>
                <div style={{marginTop:'20px',width:'max-content',display:'flex',justifyContent:'center',alignItems:'center',position:'relative',left:'50%',transform:'translateX(-50%)',display:'flex',justifyContent:'center',backgroundColor:'black',padding:'2px 10px',borderRadius:'25px'}}>
                    <StarRating userRating={userReviewRating} />
                </div>
                <p className={styles.reviewCard_userOpinion}>
                    {reviewUser_opinion}
                </p>
            
        </div>
    )
}

export default ReviewCard
