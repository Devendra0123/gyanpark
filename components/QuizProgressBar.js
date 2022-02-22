import styles from "../styles/Quiz_contest.module.css";
import React, { useState, useEffect } from "react";

function QuizProgressBar({ done }) {
    const [style, setStyle] = useState({});
  
    useEffect(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`
      };
      setStyle(newStyle);
    }, [done]);
  
    return (
      <div className={styles.progress}>
        <div className={styles.progressPercent} style={style}></div>
      </div>
    );
  }
  
  export default QuizProgressBar;
