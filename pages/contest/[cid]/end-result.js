import styles from "../../../styles/ContestResult.module.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Store } from "../../../utils/store";
import db from "../../../utils/db";
import Contest from '../../../models/Contest';
import { useContext, useEffect, useState } from "react";
import WaitForChallenge from "../../../components/WaitForChallenge";
import QuestionPopup from "../../../components/QuestionPopup";
import Head from 'next/head'

const CotestResult = ({contestant,contestOrganizer,contestQuestion,resultTime,contestExpireTime,contestQuestionLength,contestTitle}) => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [contestantResult,setContestantResult] = useState();
    const [showQuestion,setShowQuestion] = useState(false);
    const [question,setQuestion] = useState([]);
    const [students,setStudents] = useState([]);
    const [backblur,setBackblur] = useState(false);

    // Sort students by marks and time taken to submit
    function compare( a, b ) {
        if ( a.marksObtained < b.marksObtained ){
          return 1;
        }
        if ( a.marksObtained > b.marksObtained ){
          return -1;
        }
        if( a.marksObtained = b.marksObtained ){
            if ( a.timeTaken < b.timeTaken ){
                return -1;
              }
              if ( a.timeTaken > b.timeTaken ){
                return 1;
              }
           return 0;
        }
      }
    
    useEffect(()=>{ 
        if(resultTime === true && contestant?.length > 0){
            const c = contestant.sort(compare);
            setStudents(c);
           }
        if(userInfo){
            const contestantExist = contestant?.find(c => c.user === userInfo?._id);
            
            // Setting up questions and answers
             if(contestantExist?.answers && resultTime === true && contestQuestion){
              const questions = contestQuestion.map(q => {
                    const attemptedQ = contestantExist?.answers.find(a => a.questionId == q._id);
                    if(attemptedQ){
                        return {
                            _id: q._id,
                            question: q.question,
                            option1: q.option1,
                            option2: q.option2,
                            option3: q.option3,
                            option4: q.option4,
                            correctOption: q.correctOption,
                            solution: q.solution && q.solution,
                            studentOption: attemptedQ.selectedOption
                        }
                    }
                    else{
                        return {
                            _id: q._id,
                            question: q.question,
                            option1: q.option1,
                            option2: q.option2,
                            option3: q.option3,
                            option4: q.option4,
                            correctOption: q.correctOption,
                            solution: q.solution && q.solution,
                            studentOption: 0
                        }
                    }
                })
                setQuestion(questions)
             }
            if(contestantExist){
               setContestantResult(contestantExist);
            }
            else{
                setContestantResult()
            }
        }else{
            setContestantResult()
        }            
    },[userInfo,contestQuestion,contestant,resultTime]);

    // Convert millisecond into hrs,mins,sec
    function convert(time){
        const hours = Math.floor((time % (1000*60*60*24)) / (1000*60*60));
        const minutes = Math.floor((time % (1000*60*60)) / (1000*60));
        const seconds = Math.floor((time % (1000*60)) / 1000 );
        if(hours != 0){
            return `${hours} hrs ${minutes}min ${seconds}sec`
        }
        if(hours === 0 && minutes === 0){
            return `${seconds}sec`
        }
        if(hours === 0 && minutes != 0){
            return `${minutes}min ${seconds}sec`
        }
    }

    // Handle question show
    const showQuestions = ()=>{
        setBackblur(true);
        setShowQuestion(true)
    } 
   // handle cross
const handleCross = () => {
    setShowQuestion(false);
    setBackblur(false);
  };
    return (
        <div className={styles.cotestResult}>
         <Head>
           <title>{contestTitle} || result</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
            <Navbar />
            {backblur &&  <div style={{opacity:"60%",zIndex:"12",position:"absolute",width:"100%",height:"100vh",backgroundColor:"grey"}}></div>}
            {
                resultTime === true ?
                <div>
            <div className={styles.topDiv}>
             {
                contestantResult &&
                <div className={styles.contestant_result}>
                     <div className={styles.contestant_result_firstDiv}>
                         <p style={{fontSize:"16px",fontFamily:"Roboto",color:"pink",letterSpacing:"1.3px",wordSpacing:"5px"}}>
                             Your score
                         </p>
                         <p style={{letterSpacing:"2px",backgroundColor:"pink",fontFamily:"Roboto",padding:"10px",borderRadius:"50%",marginTop:"5px",color:"teal",fontWeight:"500"}}>
                         { contestantResult?.marksObtained } / { contestQuestion?.length }
                         </p>
                     </div>
                     <div className={styles.contestant_result_firstDiv}>
                         <p style={{fontSize:"16px",fontFamily:"Roboto",color:"pink",letterSpacing:"1.3px",wordSpacing:"5px"}}>
                             Your position
                         </p>
                         <p style={{letterSpacing:"2px",backgroundColor:"pink",fontFamily:"Roboto",padding:"10px",borderRadius:"50%",marginTop:"5px",color:"teal",fontWeight:"500"}}>
                             { contestantResult && students?.indexOf(contestantResult) + 1 }
                         </p>
                     </div>
                     <div onClick={showQuestions} className={styles.contestant_result_firstDiv}>
                         <p style={{fontSize:"16px",fontFamily:"Roboto",color:"pink",letterSpacing:"1.3px",wordSpacing:"5px"}}>
                           see your answers
                         </p>
                         <p style={{letterSpacing:"2px",cursor:'pointer',backgroundColor:"pink",fontFamily:"Roboto",padding:"10px",borderRadius:"50%",marginTop:"5px",color:"teal",fontWeight:"500"}}>
                             ✍
                         </p>
                     </div>
         </div>
             }
         
         
         <div className={styles.cotestResult_container_left_top}>

                   <div className={styles.winner}>
                        <p style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30px",height:"30px",padding:"10px",borderRadius:"50%",backgroundColor:"white"}}>1</p>
                        <div className={styles.trophyIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FBFF00" width="100" height="120" viewBox="0 0 24 24"><path d="M19 1c0 9.803-5.094 13.053-5.592 17h-2.805c-.498-3.947-5.603-7.197-5.603-17h14zm-7.305 13.053c-1.886-3.26-2.635-7.432-2.646-11.053h-1.699c.205 4.648 1.99 8.333 4.345 11.053zm1.743 4.947h-2.866c-.202 1.187-.63 2.619-2.571 2.619v1.381h8v-1.381c-1.999 0-2.371-1.432-2.563-2.619zm7.08-1.596c-1.402-.634-2.609-.19-3.354.293.745-.484 1.603-1.464 1.595-3.003-2.591 1.038-2.295 2.496-2.765 3.345-.315.571-1.007.274-1.007.274l-.213.352c.365.193.989.319 1.716.319 1.307 0 2.949-.409 4.028-1.58zm2.444-4.022c-1.382.097-2.118 1.061-2.501 1.763.383-.702.614-1.942-.05-3.158-1.61 1.929-.752 2.958-.762 3.831-.004.427-.49.417-.49.417l.007.404c.314-.041 3.154-.717 3.796-3.257zm1.036-3.87c-1.171.426-1.56 1.473-1.718 2.175.158-.702.041-1.863-.835-2.75-.915 2.068.082 2.745.29 3.503.102.371-.325.606-.325.606l.29.179c.061-.029 2.385-1.332 2.298-3.713zm-.2-3.792c-.903.666-1.017 1.688-.974 2.335-.042-.646-.395-1.639-1.376-2.182-.264 2.018.769 2.349 1.142 2.95.182.294.023.658.023.658l.284-.019s.026-.127.169-.442c.291-.644 1.255-1.334.732-3.3zm-1.901-2.72s-.273.984-.045 1.732c.244.798.873 1.361.873 1.361s.34-.873.099-1.733c-.222-.792-.927-1.36-.927-1.36zm-12.67 15.665l-.213-.352s-.691.297-1.007-.274c-.47-.849-.174-2.307-2.765-3.345-.008 1.539.85 2.52 1.595 3.003-.745-.484-1.952-.927-3.354-.293 1.078 1.171 2.721 1.581 4.028 1.581.727-.001 1.35-.127 1.716-.32zm-4.393-2.027l.007-.404s-.486.01-.49-.417c-.009-.873.848-1.901-.762-3.831-.664 1.216-.433 2.457-.05 3.158-.383-.702-1.12-1.666-2.501-1.763.642 2.541 3.482 3.217 3.796 3.257zm-2.533-3.413l.29-.179s-.427-.236-.325-.606c.208-.758 1.205-1.435.29-3.503-.876.887-.994 2.048-.835 2.75-.158-.702-.546-1.749-1.718-2.175-.088 2.381 2.236 3.684 2.298 3.713zm-1.366-4.204c.143.315.169.442.169.442l.284.019s-.159-.364.023-.658c.373-.601 1.405-.933 1.142-2.95-.983.542-1.335 1.534-1.377 2.181.042-.647-.072-1.67-.974-2.335-.523 1.966.441 2.656.733 3.301zm.241-4.661c-.24.86.099 1.733.099 1.733s.629-.563.873-1.361c.228-.748-.045-1.732-.045-1.732s-.705.568-.927 1.36z"/></svg>
                        </div>
                        <p style={{fontFamily:"monospace",fontSize:'18px',color:'purple',backgroundColor:'pink',borderRadius:'25px',padding:'5px 10px'}}>
                           {students[0]?.name}
                        </p>
                    </div>

                    <div className={styles.winner}>
                        <p style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30px",height:"30px",padding:"10px",borderRadius:"50%",backgroundColor:"white"}}>2</p>
                        <div className={styles.trophyIcon}>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="#F0E9D2" width="75" height="100" viewBox="0 0 24 24"><path d="M24 3c-.372 4.105-2.808 8.091-6.873 9.438.297-.552.596-1.145.882-1.783 2.915-1.521 4.037-4.25 4.464-6.251h-2.688c.059-.45.103-.922.139-1.405h4.076zm-24 0c.372 4.105 2.808 8.091 6.873 9.438-.297-.552-.596-1.145-.882-1.783-2.915-1.521-4.037-4.25-4.464-6.251h2.688c-.058-.449-.102-.922-.138-1.404h-4.077zm19-2c0 9.803-5.094 13.053-5.592 17h-2.805c-.498-3.947-5.603-7.197-5.603-17h14zm-7.305 13.053c-1.886-3.26-2.635-7.432-2.646-11.053h-1.699c.205 4.648 1.99 8.333 4.345 11.053zm1.743 4.947h-2.866c-.202 1.187-.63 2.619-2.571 2.619v1.381h8v-1.381c-1.999 0-2.371-1.432-2.563-2.619z"/></svg>
                        </div>
                        <p style={{fontFamily:"monospace",fontSize:'18px',color:'purple',backgroundColor:'pink',borderRadius:'25px',padding:'5px 10px'}}>
                           {students[1]?.name}
                        </p>
                    </div>
                  
                    <div className={styles.winner}>
                        <p style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30px",height:"30px",padding:"10px",borderRadius:"50%",backgroundColor:"white"}}>3</p>
                        <div className={styles.trophyIcon}>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="#B3541E" width="75" height="100" viewBox="0 0 24 24"><path d="M13.775 17c1.164-3.451 6.225-6.519 6.225-17h-16c0 10.481 5.061 13.549 6.225 17h3.55zm-5.192-15c.012 4.066.877 8.291 3.058 11.952-2.723-3.055-4.786-6.732-5.023-11.952h1.965zm8.417 20.449v1.551h-10v-1.551c2.552 0 3.298-2.061 3.411-3.449h3.179c.112 1.389.785 3.449 3.41 3.449z"/></svg>
                        </div>
                        <p style={{fontFamily:"monospace",fontSize:'18px',color:'purple',backgroundColor:'pink',borderRadius:'25px',padding:'5px 10px'}}>
                          {students[2]?.name}
                        </p>
                    </div>
                </div>
         </div>
         
         <div className={styles.cotestResult_container}>
             <div className={styles.cotestResult_container_left}>
             {
                 (students?.length > 0) && students?.map((c,i)=>(
                    <div key={i} className={styles.contestant_score}>
                     <p style={{flex:"1"}}>
                       <span>{i + 1}.</span> { c.name } 
                       {
                        (userInfo?.isAdmin == true && c.token) &&
                        <span style={{marginRight:'10px'}}> ({ c.token }) </span>
                       }
                       <span style={{fontFamily:'monospace',padding:'0 10px',color:'blue',opacity:'60%'}}>
                        { convert(c.timeTaken) }
                       </span>
                     </p>
                     {
                        (userInfo?.isAdmin == true && c.phoneNumber) &&
                        <p style={{marginRight:'10px'}}> { c.phoneNumber } </p>
                     }
                     <p style={{fontWeight:'600',color:'blue'}}>{c.correctAnswers.length}</p>
                 </div>
                 ))                
             }
             </div>
             <div className={styles.cotestResult_container_right}>
                {
                    contestOrganizer &&
                    <div className={styles.organizer}>
                    <p style={{backgroundColor:"black",color:"teal",textAlign:"center",padding:"5px 0px",borderRadius:"25px"}}>
                        Organized By:
                    </p>
                     <p style={{fontWeight:"600",marginTop:"5px"}}>
                         {contestOrganizer.name}
                     </p>
                     <p style={{marginTop:"5px"}}>
                         <span>Phone Number:</span> {contestOrganizer.phoneNumber}
                     </p>
                     <p style={{marginTop:"5px"}}>
                         <span>Email:</span> {contestOrganizer.email}
                     </p>
                     <p style={{marginTop:"5px"}}>
                         <span>Location:</span> {contestOrganizer.location}
                     </p>
                 </div>
                }
             </div>
         </div>

            </div>
            :
            <div className={styles.no_result_time}>
                <div className={styles.timer}>
                  <p className={styles.timer_text}>
                     Overall result will be published in
                  </p>
                  <WaitForChallenge contestDateAndTime={contestExpireTime}/>
                </div>
                <p className={styles.singleResult}>
                    Your score is <span className={styles.singleResult_span}>{ contestantResult?.marksObtained }</span>  out of <span className={styles.singleResult_span}> { contestQuestionLength }</span> 
                </p>
                <p className={styles.note_text}>
                  <span style={{color:'blue'}}> Note </span>:  You will be able to see all the questions with its correct answer once result is published 
                </p>
            </div>
            }
            
            {
                showQuestion && 
                <QuestionPopup question={question && question} cancel={handleCross} />
            }

            <Footer />
            
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const cid = ctx.params?.cid;
    await db.connect();
    const contest = await Contest.findById(cid).select('contestTitle contestExpireTime contestOrganizer contestQuestion  contestant').lean();
    await db.disconnect();
    const resultTime = contest?.contestExpireTime < new Date();
    const involvedContestant = contest?.contestant?.filter(c => c.timeTaken != 0);
  
    if (!resultTime) {
        return {
           props: {
               resultTime: false,
               contestExpireTime: contest?.contestExpireTime.toString(),
               contestQuestionLength: contest?.contestQuestion?.length,
               contestant: contest?.contestant?.map(c => {
                   return {
                       user: c.user.toString(),
                       marksObtained:  c.correctAnswers.length,                  
                   }
               })
            }
        }
     }
  
    return { props: {

        resultTime: true,
        contestTitle: contest?.contestTitle,
        contestExpireTime: contest?.contestExpireTime.toString(),
        contestQuestion: contest.contestQuestion.map(q => {
            return {
             _id: q._id.toString(),
             question: q.question,
             option1: q.option1,
             option2: q.option2,
             option3: q.option3,
             option4: q.option4,
             correctOption: q.correctOption,
             solution: q.solution ? q.solution : ''
            }
           }
           ),
        contestant: involvedContestant?.map(c => {
            return {
                user: c.user.toString(),
                name: c.name,
                token: c.token? c.token : null,
                phoneNumber: c.phoneNumber? c.phoneNumber : null,
                timeTaken: c.timeTaken ? c.timeTaken : 0,
                answers: c.answers.map(a => {
                    return {
                        questionId: a.questionId,
                        selectedOption: a.selectedOption
                    }
                }),
                correctAnswers: c.correctAnswers.map(item=>{
                    return {
                        questionId: item.questionId
                    }
                }),  
                marksObtained:  c.correctAnswers.length            
            }
        }),
        contestOrganizer: contest?.contestOrganizer
         } }
  }

export default CotestResult
