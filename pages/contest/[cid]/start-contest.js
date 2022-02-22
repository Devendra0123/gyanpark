import QuizProgressBar from "../../../components/QuizProgressBar";
import styles from "../../../styles/Quiz_contest.module.css";
import { useState,useContext,useEffect,useRef } from "react";
import db from "../../../utils/db";
import Contest from '../../../models/Contest';
import WaitForChallenge from "../../../components/WaitForChallenge";
import LoadingBar from "../../../components/LoadingBar";
import { useRouter } from "next/router";
import { Store } from "../../../utils/store";
import axios from 'axios';
import Head from 'next/head'

const Quiz_competetion = ({contestQuestions,firstQuestionTime,startTime,contestExpireTime,contestDateAndTime,contestant}) => {
    const router = useRouter();
    const [tickedOption,setTickedOption] = useState([{
        questionId:'',
        selectedOption:''
    }]);
    const [selectedOption,setSelectedOption] = useState();
    const [index,setIndex] = useState(0);
    const [questionTime,setQuestionTime] = useState(firstQuestionTime);
    const [timeoutPopup,setTimeoutPopup] = useState(false);
    const [backblur,setBackblur] = useState(false);
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [expiredContest,setExpiredContest] = useState(false);
    const [timeStart,setTimeStart] = useState()
    const { state } = useContext(Store);
    const { userInfo } = state;

    // Handle question time
  const interval = useRef();
  const startTimer = ()=>{
    interval = setInterval(()=>{
       
      if(questionTime === 0){
        if(expiredContest === true || startTime === false){
          setBackblur(false);
          setTimeoutPopup(false);
        }else{
          setBackblur(true)
          setTimeoutPopup(true);
        }
         clearInterval(interval);
        
         return;
      }if(questionTime === '00'){
        clearInterval(interval);
        return;
      }else{
        setQuestionTime(questionTime - 1)
      }
    },1000)
  }

  // Handle selected Option
  const handleSelectedOption = (e, questionId, index) => {
    const { value } = e.target;
    setSelectedOption(value);
    const list = [...tickedOption];  
      list[index].questionId = questionId;
      list[index].selectedOption = value;
      setTickedOption(list);
  };

// handle cross
const handleCross = () => {
    setBackblur(false);
    setTimeoutPopup(false);
    setError(false);
    setSuccess(false);
    setQuestionTime('00')
  };

// Handle Next
const handleNext = ()=>{ 
   if(index + 1 === contestQuestions.length){
    setBackblur(false);
    setTimeoutPopup(false);
    setSelectedOption("");
    setIndex(index+1);
    setSelectedOption();
    setQuestionTime('00');
   }else{
    setBackblur(false);
    setTimeoutPopup(false);
    setSelectedOption("");
    setIndex(index+1);
    setSelectedOption();
    setQuestionTime(contestQuestions[index + 1]?.time);
    setTickedOption([
        ...tickedOption,
        {
            questionId:'',
            selectedOption:''
        }
      ]);
   }  
 }

 // Handle submit answers
const handleSubmitAnswers = async()=>{
    try{
      setLoading(true);
      const timeTaken = new Date().getTime() - new Date(timeStart).getTime();
        const {cid} = router.query;
      const {data} = await axios.post('/api/contest/submit-answers',{
          contestId: cid,
          contestantId: userInfo._id,
          tickedOption,
          timeTaken
      })
      if(data){
        setLoading(false);
        setSuccess(true)
        setMessage('Your answers have been submitted successfully')
      }
    }
    catch(err){
      console.log(err)
      setLoading(false);
      setError(true);
      setMessage('Something went wrong')
    }
}

// handle see result
const handleSeeResult = ()=>{
  const {cid} = router.query;
  router.push(`/contest/${cid}/end-result`)
}

 useEffect(()=>{
    startTimer();
    return ()=>{
      clearInterval(interval);
    }
})

useEffect(()=>{
  if(!userInfo){
   router.push('/')
  }
  if(userInfo){
    const isRegistered = contestant?.find(c => c.user === userInfo._id);
    if(isRegistered){
      setTimeStart(Date.now())
    }
    if(!isRegistered){
      router.push('/')
    }
  }
},[userInfo,contestant,router]);

const goBack = ()=>{
    const {cid} = router.query;
    router.push(`/contest/${cid}/details`);
}
    
    return (
        <div className={styles.quiz_competetion}>
         <Head>
           <title>play</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
         {backblur &&  <div style={{opacity:"60%",zIndex:"12",position:"absolute",width:"100%",height:"100vh",backgroundColor:"grey"}}></div>}
        {
          (startTime === false) ?
            <div className={styles.waitForContest}>
              <WaitForChallenge pageReload={true} text='Starts in' contestDateAndTime={contestDateAndTime}/>
              <p style={{fontFamily:'Roboto',marginTop:'20px',fontSize:'16px',fontWeight:'600',color:'brown',wordSpacing:'2px',letterSpacing:'1.3px'}}>
                  Please comeback later when contest will start.
              </p>
              <button onClick={goBack} className={styles.goBackBtn}>
                  Go Back
              </button>
            </div>
            :
            <div className={styles.quiz_competetion}>         
              
       {(startTime === true && expiredContest === false && contestQuestions.length > 1 && contestQuestions[index]) ?
           <div className={styles.quiz_competetion}>
           <div className={styles.quiz_competetion_top}>
           <WaitForChallenge inactive={true} text='Contest Expires In' contestDateAndTime={contestExpireTime}/>
            </div>
       
            <div className={styles.quiz_competetion_main}>
                <div className={styles.timer}>
                    <span className={styles.timer_span}>
                        { questionTime } 
                    </span>
                    <span className={styles.time_span_text}>
                     second
                    </span>
                </div>
                <div className={styles.main}>

                   <div className={styles.main_left}>
                       <span className={styles.questionNumber}>
                           { index + 1 } / { contestQuestions.length }
                       </span>
                   </div>
                   <div className={styles.main_right}>
                         
                            <div className={styles.main_right_quiz}>
                           <h3 className={styles.main_right_quiz_question}>
                             Q) {contestQuestions[index].question}
                           </h3>
                           
                            <div className={styles.option}>
                              <input 
                                onChange={(e) => handleSelectedOption(e,contestQuestions[index]._id,index)}
                                className={styles.radio_input} 
                                disabled={( questionTime === 0 || questionTime === '00' ) ? true : false}
                                type="radio" 
                                value={1}
                                name={`option+${index}`}
                                checked={selectedOption == 1 ? true : false}
                                />
                              <p className={styles.option_text}>
                                 {contestQuestions[index].option1}
                              </p>
                           </div>

                           <div className={styles.option}>
                              <input 
                                onChange={(e) => handleSelectedOption(e,contestQuestions[index]._id,index)}
                                className={styles.radio_input} 
                                disabled={( questionTime === 0 || questionTime === '00' ) ? true : false}
                                type="radio" 
                                value={2}
                                name={`option+${index}`}
                                checked={selectedOption == 2 ? true : false}
                                />
                              <p className={styles.option_text}>
                                {contestQuestions[index].option2}
                              </p>
                           </div>

                           <div className={styles.option}>
                              <input 
                                onChange={(e) => handleSelectedOption(e,contestQuestions[index]._id,index)}
                                className={styles.radio_input} 
                                disabled={( questionTime === 0 || questionTime === '00' ) ? true : false}
                                type="radio" 
                                value={3}
                                name={`option+${index}`}
                                checked={selectedOption == 3 ? true : false}
                                />
                              <p className={styles.option_text}>
                                {contestQuestions[index].option3}
                              </p>
                           </div>

                           <div className={styles.option}>
                              <input 
                                onChange={(e) => handleSelectedOption(e,contestQuestions[index]._id,index)}
                                className={styles.radio_input} 
                                disabled={( questionTime === 0 || questionTime === '00' ) ? true : false}
                                type="radio" 
                                value={4}
                                name={`option+${index}`}
                                checked={selectedOption == 4 ? true : false}
                                />
                              <p className={styles.option_text}>
                                {contestQuestions[index].option4}
                              </p>
                           </div>
                           
                       </div>
                      
                       <QuizProgressBar done={((index + 1)/contestQuestions.length) * 100} />
                   </div>
                </div>
                <div className={styles.next}>
                    <button
                      onClick={handleNext}
                      style={{fontSize:"15px",letterSpacing:"1.5px",border:"none",padding:"10px 15px",borderRadius:"5px",backgroundColor:"teal",color:"white"}}>
                        next
                    </button>
                </div>
            </div>
           </div>
            :    
          <div>
             {
               success ?
              <div className={styles.submitDiv}>
                 <p style={{fontFamily:'monospace',textAlign:'center',fontSize:'20px',color:'white'}}>
                   {message}
                 </p>
                 <button onClick={handleSeeResult} style={{padding:'10px 15px',marginTop:'20px',fontSize:'16px',letterSpacing:'1.2px',border:'2px solid white',borderRadius:'10px',backgroundColor:'red',color:'white'}}>
                   See Result
                 </button>
              </div>
          :
          <div className={styles.submitDiv}>
          <p style={{padding:'10px',textAlign:'center',fontFamily:'Roboto',color:'white',fontSize:'20px',letterSpacing:'1.3px',wordSpacing:'2px'}}>
                    Submit your answers
                </p>
                <button
                 onClick={handleSubmitAnswers}
                 style={{fontSize:"15px",textAlign:'center',letterSpacing:"1.5px",border:"none",padding:"10px 15px",borderRadius:"5px",backgroundColor:"blue",color:"white"}}>
                   {loading ? <LoadingBar /> : 'Submit'} 
                </button>  
          </div>
             }         
            </div>
            }     
        </div>
        }

        {
          /* handle error */
            error && 
            <div className={styles.timeoutPopup}>
                <p style={{padding:'10px',fontFamily:'Roboto',color:'brown',fontSize:'20px',letterSpacing:'1.3px',wordSpacing:'2px'}}>
                    {message}
                </p>
                <button
                 onClick={handleSubmitAnswers}
                 style={{fontSize:"15px",letterSpacing:"1.5px",border:"none",padding:"10px 15px",borderRadius:"5px",backgroundColor:"teal",color:"white"}}>
                    Retry
                </button>
                <div onClick={handleCross} className={styles.cross}>
                    <div className={styles.line1}></div>
                    <div className={styles.line2}></div>
                </div>
            </div>
        }

        {
            (timeoutPopup) &&
            <div className={styles.timeoutPopup}>
                <p style={{padding:'10px',fontFamily:'Roboto',color:'brown',fontSize:'20px',letterSpacing:'1.3px',wordSpacing:'2px'}}>
                    Sorry! timeout
                </p>
                <button
                 onClick={handleNext}
                 style={{fontSize:"15px",letterSpacing:"1.5px",border:"none",padding:"10px 15px",borderRadius:"5px",backgroundColor:"teal",color:"white"}}>
                    Next Question
                </button>
                <div onClick={handleCross} className={styles.cross}>
                    <div className={styles.line1}></div>
                    <div className={styles.line2}></div>
                </div>
            </div>
        }

        </div>
    )
}

export async function getServerSideProps(ctx) {
    const cid = ctx.params?.cid;
    await db.connect();
    const contest = await Contest.findById(cid).select('contestQuestion contestExpireTime contestDateAndTime contestant').lean();
    await db.disconnect();
    const startTime = new Date(contest?.contestDateAndTime).getTime() < new Date().getTime()

    const questions = contest?.contestQuestion?.map(q => {
        return {
            _id: q._id.toString(),
            question: q.question,
            option1: q.option1,
            option2: q.option2,
            option3: q.option3,
            option4: q.option4,
            time: q.time
        }
    })
 
    if (!startTime) {
        return {
           props: {
            startTime: false,
              firstQuestionTime: 0,
               contestDateAndTime: contest?.contestDateAndTime.toString(),
               contestExpireTime: contest?.contestExpireTime.toString(),
               contestant: contest?.contestant?.map(c => {
                   return {
                       user: c.user.toString() 
                   }
               })
        },
        }
     }
  
    return { props: {
         startTime: true,
         firstQuestionTime: contest?.contestQuestion[0].time,
         contestQuestions: questions,
         contestExpireTime: contest?.contestExpireTime.toString(),
         contestant: contest?.contestant?.map(c => {
            return {
                user: c.user.toString() 
            }
        })
         } }
  }

export default Quiz_competetion
