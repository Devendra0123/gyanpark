import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProgramCard from "../../components/ProgramCard";
import styles from "../../styles/BoardQuestion.module.css";
import Head from 'next/head'
import db from "../../utils/db";
import Questionpaper from '../../models/Questionpaper';

const Boardquestion = ({questionPaper}) => {

    return (
        <div className={styles.boardquestion}>
         <Head>
           <title>Board Question</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
         <Navbar activePage={5} /> 

           {
            questionPaper?.map((q,i) => (
              <div key={i} className={styles.programwise}>
           <p className={styles.programTitle}>
             {q.program}
           </p>
           <div className={styles.boardquestion_lists}>  
             {
               q.questionPaper.map((p,i)=>(
                <ProgramCard
                key={i}
              program={q.program}
              programYear={p.programYear == 1 ? 'First Year' : p.programYear == 2 ? 'Second Year': p.programYear == 3 ? 'Third Year' : p.programYear == 4 ? 'Fourth Year' : p.programYear == 5 ? 'Fifth Year' : null}
              programLink={q.program}
              programYearLink={p.programYear}
              examYearLink={p.examYear} />
               ))
             }       
           </div>
         </div>
            ))
           }
       
       <Footer />
        </div>
    )
}

export async function getStaticProps(ctx) {
  await db.connect();
  const questionPapers = await Questionpaper.find({}).select('program questionPaper').lean();
  await db.disconnect();
 
  const p = questionPapers.map(questionPaper=>{
    return{
    _id: questionPaper._id.toString(),
    program: questionPaper.program,
    questionPaper: questionPaper.questionPaper.map(q=>{
      return {
        programYear: q.programYear,
        examYear: q.examYear,
      }
    })
  }});

  if(!questionPapers){
    return {
      props: {
        questionPaper: [],
     
    }
  }
  }

   return {
     props: {
       questionPaper: p,
     revalidate: 10,
   }
 }
}

export default Boardquestion
