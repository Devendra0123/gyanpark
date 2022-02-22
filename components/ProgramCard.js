import styles from "../styles/BoardQuestion.module.css";
import Link from 'next/link';

const ProgramCard = ({program,programYear,programLink,programYearLink,examYearLink}) => {
    return (
        <Link href={`/board-question/${programLink}/${programYearLink}/${examYearLink}`} passHref>
        <div className={styles.boardquestion_lists_item}>
            <div className={styles.boardquestion_lists_item_background}></div>
             <div className={styles.boardquestion_lists_item_content}>
                <p style={{fontWeight:"700",fontSize:'18px',fontFamily:'monospace',color:'blue'}}>{program}</p>
                <button style={{border:"none",padding:"10px 15px",marginTop:"10px",borderRadius:"5px",backgroundColor:"green",color:"white"}}>{programYear}</button>
                <p style={{padding:'10px 0',fontSize:'17px'}}> {examYearLink} </p>
             </div>
         </div>
         </Link>
    )
}

export default ProgramCard
