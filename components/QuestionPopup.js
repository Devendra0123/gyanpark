import styles from "../styles/QuestionPopup.module.css";
import { useState } from 'react';

const QuestionPopup = ({question,cancel}) => {

  const [getSolution,setGetSolution] = useState('');

  return (
   <div className={styles.questionPopup}>
        {
            question && question.map((q,i) =>(
                <div key={q._id} className={styles.eachQuestiion} >
                   <h4 className={styles.question}>
                      {i + 1}. {q.question}
                   </h4>

                   <p className={`${styles.option} ${( q.correctOption == 1) && styles.correctAnswer }`}>
                      a. { q.option1 }
                       {q.studentOption === 1 &&
                       <small style={{color: q.studentOption === q.correctOption ? 'black' : 'red'}}>
                              Your answer
                       </small>
                       }
                   </p>

                   <p className={`${styles.option} ${( q.correctOption == 2) && styles.correctAnswer }`}>
                      b. { q.option2 }
                       {q.studentOption === 2 &&
                       <small style={{color: q.studentOption === q.correctOption ? 'black' : 'red'}}>
                              Your answer 
                       </small>
                       }
                   </p>

                   <p className={`${styles.option} ${( q.correctOption == 3) && styles.correctAnswer }`}>
                      c. { q.option3 }
                       {q.studentOption === 3 &&
                       <small style={{color: q.studentOption === q.correctOption ? 'black' : 'red'}}>
                             Your answer 
                       </small>
                       }
                   </p>

                   <p className={`${styles.option} ${( q.correctOption == 4) && styles.correctAnswer }`}>
                      d. { q.option4 }
                       {q.studentOption === 4 &&
                       <small style={{color: q.studentOption === q.correctOption ? 'black' : 'red'}}>
                              Your answer 
                       </small>
                       }
                   </p>

                   <button onClick={()=> setGetSolution(i)} style={{padding:'5px',fontFamily:'Roboto',border:'2px solid grey',borderRadius:'5px',color:'grey'}}>
                     Solution
                   </button>
                   {
                     getSolution == i && 
                     <div className={styles.solution}>
                        <p>
                          {q?.solution}
                        </p>
                     </div>
                   }
                </div>
            ))
        }
        <div onClick={cancel} className={styles.cross}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
        </div>
   </div>
  );
};

export default QuestionPopup;
