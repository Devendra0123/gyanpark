import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import styles from "../../../../styles/BoardQuestion.module.css";
import React,{useState} from "react"
import db from "../../../../utils/db";
import Questionpaper from "../../../../models/Questionpaper";
import Image from 'next/image'
import Head from 'next/head'

const YearId = ({questionPaper}) => {
  const [open,setOpen] = useState(false);
  const [previewImage,setPreviewImage] = useState("");

  const handlePreview = (e)=>{
    setOpen(true);
    setPreviewImage(e.target.name);
}
    return (
        <div className={styles.yearwise_questionPaper}>
         <Head>
           <title>{questionPaper?.program} || {questionPaper?.programYear} || Question Paper || Year {questionPaper?.examYear}</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
           {open &&  <div style={{opacity:"60%",zIndex:"9",position:"absolute",width:"100%",height:"500vh",backgroundColor:"grey"}}></div>} 

          <Navbar /> 
          {
            questionPaper &&
            <>
            <h2 className={styles.boardProgramTitle}>{questionPaper.program} { questionPaper.programYear == 1 ? '1st Year' :questionPaper.programYear == 2 ? '2nd Year' : questionPaper.programYear == 3 ? '3rd Year' : questionPaper.programYear == 4 ? '4th Year' : questionPaper.programYear == 5 ? '5th Year' : null} {questionPaper.examYear}</h2>
            <p style={{opacity:'40%',color:'white'}}>
              {questionPaper._id}
            </p>

<p className={styles.questionPaper_preview_title}>
    Click on the pages below to preview the question paper 
</p>

<div className={styles.yearwise_questionPaper_imgages}>
{
  questionPaper?.questionPaper?.map((q,i)=>(
    <div key={i} style={{display: 'flex',marginLeft:'20px',marginTop:'10px',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <Image
    width={150}
    height={180} 
    name={q}
    onClick={handlePreview}
    className={styles.yearwise_questionPaper_imgages_item}
    src={`${process.env.NEXT_PUBLIC_URL}/questionPaper/${q}`}
    alt="images"
    />
    <a href={`${process.env.NEXT_PUBLIC_URL}/questionPaper/${q}`} download >
    <button style={{padding:"10px 15px",border:"2px solid white",borderRadius:"15px",backgroundColor:"red",color:"white"}}>
        Download
      </button>
    </a>
    </div>
  ))
}
       {
               open && 
               <div className={styles.page_preview_dialogue_box}>
                 <div onClick={()=>setOpen(false)} className={styles.cross}>
                    <div className={styles.line1}></div>
                    <div className={styles.line2}></div>
                 </div>
                 <Image 
                    className={styles.page_preview_dialogue_box_img}
                     src={`${process.env.NEXT_PUBLIC_URL}/questionPaper/${previewImage}`}
                     width={500} height={600}
                     alt="page"
                 />
               </div>
           }
</div>
            </>
          }
        
        <Footer />
        
        </div>
    )
}

export async function getStaticProps(ctx) {
  const pid = await ctx.params?.pid;
  const qid = await ctx.params?.qid;
  const year = await ctx.params?.year;
  await db.connect();
  const questionPapers = await Questionpaper.findOne({program:pid}).select('program questionPaper').lean();
  await db.disconnect();
  const questionPaper = questionPapers.questionPaper.find(q => q.programYear == qid && q.examYear == year)
 
  const p = {
    _id: questionPaper._id.toString(),
    program: questionPapers.program,
    programYear: questionPaper.programYear,
    examYear: questionPaper.examYear,
    questionPaper: questionPaper.questionPaper
  };

  if(!questionPaper){
    return {
      props: {
        questionPaper: [],
     
    }
  }
  }

   return {
     props: {
       questionPaper: p
   },
   revalidate: 10
 }
}

export async function getStaticPaths() {
  await db.connect();
  const questionPapers = await Questionpaper.find({}).select('program questionPaper').lean();
  await db.disconnect();
  let pathParams = [];
  for(let i = 0; i < questionPapers.length; i++) {
    questionPapers[i].questionPaper.map(q=>{
      pathParams.push({
        params: { pid: questionPapers[i].program, qid: q.programYear, year: q.examYear}
      })
    })
  }
  return {
    paths: pathParams,
    fallback: true 
  };
}

export default YearId
