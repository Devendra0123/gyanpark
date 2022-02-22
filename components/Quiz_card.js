import styles from "../styles/QuizContest.module.css";
import Link from 'next/link'

const Quiz_card = ({contestTitle,contestLink,btnName,topicList,examFee,contestDateAndTime,contestId,numbOfQue,organizerName,contestTime,contestPrize}) => {
    return (
        <div className={styles.quizCard}>
          <div className={styles.quizCard_top}>
            <div className={styles.quizCard_left}>
              <h2 className={styles.quizCard_left_title}>
                {contestTitle}
              </h2>
              <p style={{width:'100%',fontFamily:'Roboto',color:'brown',fontSize:'12px',fontWeight:'500',textAlign:'center'}}>
                {contestDateAndTime}
              </p>
              <ul className={styles.quizCard_left_subjects}>
                 {
                  topicList?.map((topic,i)=>(
                    <li key={i} className={styles.quizCard_left_subjects_item}>
                       <div className={styles.quizCard_left_subjects_item_span}></div> {topic}
                    </li>
                  ))
                 }
              </ul>
              
              <p style={{color:'brown',fontSize:'15px',fontWeight:'600',fontFamily:'monospace'}}>
                <span style={{ fontFamily:"Roboto",fontSize:"15px",fontWeight:"500",letterSpacing:"1px",marginTop:"5px"}}>Number of questions:</span> {numbOfQue}
              </p>

              <p style={{color:'brown',fontSize:'15px',fontWeight:'600',fontFamily:'monospace'}}>
                <span style={{ fontFamily:"Roboto",fontSize:"15px",fontWeight:"500",letterSpacing:"1px",marginTop:"5px"}}>Contest Charge:</span> {examFee ? `Rs. ${examFee}` : 'No Charge'}
              </p>

              <p style={{color:'brown',fontSize:'15px',fontWeight:'600',fontFamily:'monospace'}}>
                <span style={{ fontFamily:"Roboto",fontSize:"15px",fontWeight:"500",letterSpacing:"1px",marginTop:"5px"}}>Organised by:</span> {organizerName}
              </p>

            </div>
            <div className={styles.quizCard_right}>
              <p style={{fontFamily:'monospace',color:'brown'}}>Quiz starts in:</p>
              <p className={styles.quizCard_right_time}>{contestTime}</p>
              <p style={{color:'brown',fontSize:'15px',fontWeight:'600',fontFamily:'monospace',marginTop:'10px'}}>
                <span style={{fontFamily:"Cookie",fontSize:"20px",fontWeight:"600",letterSpacing:"2px",marginTop:"15px"}}>Prizes:</span> {contestPrize}
              </p>
            </div>
          </div>
         <Link href={contestLink} passHref>
          <button className={styles.quizCard_join_btn}>
              {btnName}
          </button>
          </Link>
        </div>
    )
}

export default Quiz_card
