import styles from "../../../styles/QuizContest.module.css";
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import db from "../../../utils/db";
import Contest from '../../../models/Contest';
import { useContext, useState, useEffect } from 'react';
import NoTokenPopup from "../../../components/NoTokenPopup";
import { Store } from "../../../utils/store";
import { useRouter } from "next/router";
import axios from 'axios';
import LoadingBar from "../../../components/LoadingBar";
import WaitForChallenge from "../../../components/WaitForChallenge";
import Head from 'next/head'

const QuizDetails = ({contestDetails}) => {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [noToken,setNoToken] = useState(false);
  const [opening, setOpening] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [token,setToken] = useState('');
  const [phoneNumber,setPhoneNumber] = useState(null);
  const [loading,setLoading] = useState(false);
  const [failed,setFailed] = useState(false);
  const [registeredUser,setRegisteredUser] = useState(false);

  const handleCross = () => {
    setOpening(false);
    setNoToken(false);
    setLoginPopup(false);
    setLoading(false);
    setFailed(false)
  };

  const handleNoToken = ()=>{
    setOpening(true);
    setNoToken(true);
  }

// Hanlde join contest
  const handleJoinContest = async(e)=>{
    e.preventDefault()
    if(!userInfo){
      setOpening(true);
      setLoginPopup(true)
    }else{
      try{
        setLoading(true);
        if(contestDetails?.tokenSystem == 'no'){
          const {data} = await axios.post('/api/contest/register-contestant',{
            contestId : contestDetails?._id,
            contestantId: userInfo._id,
            contestantName: userInfo.name,
            phoneNumber
          });
          if(data){
            setLoading(false);
            setRegisteredUser(true);
          }
        }
        else{
          const {data} = await axios.post('/api/contest/register-contestant',{
            contestId : contestDetails?._id,
            contestantId: userInfo._id,
            contestantName: userInfo.name,
            token,
            phoneNumber
          });
          if(data){
            setLoading(false);
            setRegisteredUser(true);
          }
        }    
      }
      catch(err){
        setLoading(false);
        setOpening(true);
        setFailed(true);
      }
    }
  }

  // redirect to login
  const redirectLogin = ()=>{
    const {cid} = router.query;
    router.push(`/user/login?redirect=/contest/${cid}/details`);
  }

  // redirect signUp
  const redirectSignup = ()=>{
    const {cid} = router.query;
    router.push(`/user/signup?redirect=/contest/${cid}/details`);
  }

  // Handle take test
  const handleTakeTest = ()=>{
    const {cid} = router.query;
    router.push(`/contest/${cid}/start-contest`)
  }

  useEffect(()=>{
      if(!userInfo){
        setRegisteredUser(false)
      }
      if(userInfo){
        const isRegistered = contestDetails.contestant?.find(c => c.user === userInfo._id);
        setRegisteredUser(isRegistered);
      }
  },[userInfo,contestDetails.contestant])

    return (
        <div className={styles.quiz_details}>
        <Head>
          <title>{contestDetails.contestTitle}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
           <Navbar />
           {opening &&  <div style={{opacity:"60%",zIndex:"12",position:"absolute",width:"100%",height:"500vh",backgroundColor:"grey"}}></div>}
           <div className={styles.quizDetails_body}>
           {
             contestDetails && 
             <>
             <div className={styles.quiz_details_left}>
        
                <h1 className={styles.quizDetails_quiz_title}>
                  {contestDetails.contestTitle}
                </h1>
                <div className={styles.register_user_top}>
                  {
                    
                      registeredUser 
                      ?
                      <div style={{marginTop:'10px'}} className={`${styles.registeredMessage} ${styles.show}`}>
                         <p className={styles.registeredMessage_text}>
                           Congratulations! You have successfully registered for the contest.
                         </p>
                         <button onClick={handleTakeTest} className={styles.registeredMessage_btn}>
                           Click to take test
                         </button>
                      </div> :
                      <div className={styles.register_user_top}>
                      <div style={{marginTop:'20px'}}>
                  <WaitForChallenge text='Starts in' contestDateAndTime={contestDetails.contestDateAndTime}/>
                 </div>
                  {
                        contestDetails?.tokenSystem == 'no' ?
                        <form className={`${styles.tokenForm} ${styles.show}`} onSubmit={handleJoinContest}>     
                          <label style={{fontFamily:'Cookie',color:'white',letterSpacing:'1.5px',fontSize:'20px',marginTop:'10px'}}>
                            Phone Number
                          </label>
                          <input
                           required={true}
                           className={styles.tokenInput}
                           onChange={(e) => setPhoneNumber(e.target.value)}
                           type='number'
                           placeholder='Enter your phone number' />

                          <button disabled={loading ? true : false} className={styles.submitTokenBtn} type='submit'>
                             { loading ? <LoadingBar /> : 'Join Contest' }
                          </button>
                        </form> :
                         <div>
                         <div style={{display:'flex',alignItems:'center',marginTop:'20px'}}>
                         <p style={{fontFamily:'Roboto',color:'blue',marginRight:'10px'}}>
                           Do not have token?
                         </p>
                        <button onClick={handleNoToken} className={styles.noTokenBtn}>
                            Get Token
                        </button>
                    </div>
            
                        <form className={`${styles.tokenForm} ${styles.show}`} onSubmit={handleJoinContest}>
      
                            <div className={styles.tokenDiv}>
                              <label style={{fontFamily:'Cookie',color:'white',letterSpacing:'1.5px',fontSize:'20px',marginTop:'10px'}}>Token</label>
                              <input
                               className={styles.tokenInput}
                               onChange={(e)=> setToken(e.target.value)}
                               required={true}
                               type='text'
                               placeholder="Enter Token Provided" />
                            </div>
      
                            <label style={{fontFamily:'Cookie',color:'white',letterSpacing:'1.5px',fontSize:'20px',marginTop:'10px'}}>
                              Phone Number
                            </label>
                            <input
                             required={true}
                             className={styles.tokenInput}
                             onChange={(e) => setPhoneNumber(e.target.value)}
                             type='number'
                             placeholder='Enter your phone number' />

                            <button disabled={loading ? true : false} className={styles.submitTokenBtn} type='submit'>
                               { loading ? <LoadingBar /> : 'Join Contest' }
                            </button>
                          </form>
                          </div>
                      }
                      </div>

                  }
               </div>
                <p style={{fontFamily:"Roboto"}}>
                  <span style={{fontWeight:"700",color:"blueviolet",fontSize:"19px"}}>Note:</span> If any prize is mentioned by the organizer of this competition, website owner is not responsible for the prize since website owner has not created this competition
                </p>

                <p className={styles.quizDateAndTime}>Date of contest : { contestDetails.contestDateAndTime } </p>
                <div style={{display:'flex',flexWrap:'wrap',marginTop:"15px",fontFamily:"Roboto"}}>
                  <span>Topics:</span> 
                  {contestDetails.contestTopic.map((t,i)=>(
                    <li key={i} style={{marginLeft:'5px',fontWeight:'600'}}>👁‍🗨{t}</li>
                  ))}
                </div>
                <p style={{ width:'100%',marginTop:"10px",fontFamily:"Roboto",display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'500',backgroundColor:'green',color:'white',padding:'5px',borderRadius:'10px',letterSpacing:'1.3px'}}>
                  <span style={{marginRight:'10px',fontWeight:'600'}}>{contestDetails.totalQuestion}</span> multiple choice question
                </p>
                <p style={{marginTop:"5px",fontFamily:"Roboto",marginTop:'10px'}}>
                  <span style={{color:'brown',fontWeight:'600',fontFamily:'cursive'}}>Read me</span> : { contestDetails.contestDescription }
                </p>
                <div className={styles.quiz_details_before_u_start_section}>
                 <h3 style={{fontFamily:"Roboto",color:'brown'}}>
                    Before you start
                  </h3>
                  <ul className={styles.quiz_details_before_u_start_section_lists}>
                    <li style={{marginTop:"2px"}}>
                     1) You must complete this assessment in one session, make sure internet is reliable.
                    </li>
                    <li style={{marginTop:"2px"}}>
                     2) You must answer each given question within the given time period.
                    </li>
                    <li style={{marginTop:"2px"}}>
                     3) Time for each question will vary based on the difficulty level.
                    </li>
                    <li style={{marginTop:"2px"}}>
                     4) You will be able to see your result once you submit your answers but overall result will be published only after mentioned result publishing time on our website.
                    </li>
                    <li style={{marginTop:"2px"}}>
                     5) If two or more contestant get the same result, priority will be given to one who has submitted answers in less time.
                    </li>
                  </ul>
                </div>
                <h3 style={{fontFamily:"Roboto",marginTop:"20px",color:'brown'}}>
                  Prizes
                </h3>
                <p style={{fontFamily:"Roboto",marginTop:"5px"}}>
                  { contestDetails.prizes }
                </p>
                <>
                <h3 style={{marginTop:"20px",fontFamily:"Roboto",color:'brown'}}>
                  <span>Organised By:</span>
                </h3>
                <p style={{fontFamily:"Roboto"}}>
                  Name : <span style={{fontWeight:'600'}}>{ contestDetails.contestOrganizer.name }</span>
                </p>
                <p style={{fontFamily:"Roboto"}}>
                  Phone Number : <span style={{fontWeight:'600'}}>{ contestDetails.contestOrganizer.phoneNumber }</span>
                </p>
                <p style={{fontFamily:"Roboto"}}>
                  Email : <span style={{fontWeight:'600'}}>{ contestDetails.contestOrganizer.email }</span>
                </p>
                <p style={{fontFamily:"Roboto"}}>
                  Location : <span style={{fontWeight:'600'}}>{ contestDetails.contestOrganizer.location }</span>
                </p>
                </>
              </div>
              <div className={styles.quiz_details_right}>
                <div className={styles.quiz_details_right_starts_in}>
                  <div className={styles.contest_timer_right}>
                    <WaitForChallenge text='Starts in' contestDateAndTime={contestDetails.contestDateAndTime}/>
                  </div>
                  <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',padding:'20px 0'}}>

                    {
                      registeredUser 
                      ?
                      <div className={styles.registeredMessage}>
                         <p className={styles.registeredMessage_text}>
                           Congratulations! You have successfully registered for the contest.
                         </p>
                         <button onClick={handleTakeTest} className={styles.registeredMessage_btn}>
                           Click to play contest
                         </button>
                      </div> 
                      :
                      <div className={styles.right} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                      <p className={styles.note_credentials} style={{fontFamily:'monospace',fontSize:'17px',color:'brown'}}>
                       Please enter credentials below to join the contest. We assure you that we wont share your contact information to anyone.
                     </p>
                    
                    {
                        contestDetails?.tokenSystem == 'no' ?
                        <form className={styles.tokenForm} onSubmit={handleJoinContest}>     
                          <label style={{fontFamily:'Cookie',color:'white',letterSpacing:'1.5px',fontSize:'20px',marginTop:'10px'}}>
                            Phone Number
                          </label>
                          <input
                           required={true}
                           className={styles.tokenInput}
                           onChange={(e) => setPhoneNumber(e.target.value)}
                           type='number'
                           placeholder='Enter your phone number' />

                          <button disabled={loading ? true : false} className={styles.submitTokenBtn} type='submit'>
                             { loading ? <LoadingBar /> : 'Join Contest' }
                          </button>
                        </form> :
                         <div>
                         <div className={styles.donot_have_token}>
                         <p style={{fontFamily:'Roboto',color:'blue',marginRight:'10px'}}>
                           Do not have token?
                         </p>
                        <button onClick={handleNoToken} className={styles.noTokenBtn}>
                            Get Token
                        </button>
                    </div>
                        <form className={styles.tokenForm} onSubmit={handleJoinContest}>
      
                            <div className={styles.tokenDiv}>
                              <label style={{fontFamily:'Cookie',color:'white',letterSpacing:'1.5px',fontSize:'20px',marginTop:'10px'}}>Token</label>
                              <input
                               className={styles.tokenInput}
                               onChange={(e)=> setToken(e.target.value)}
                               required={true}
                               type='text'
                               placeholder="Enter Token Provided" />
                            </div>
      
                            <label style={{fontFamily:'Cookie',color:'white',letterSpacing:'1.5px',fontSize:'20px',marginTop:'10px'}}>
                              Phone Number
                            </label>
                            <input
                             required={true}
                             className={styles.tokenInput}
                             onChange={(e) => setPhoneNumber(e.target.value)}
                             type='number'
                             placeholder='Enter your phone number' />

                            <button disabled={loading ? true : false} className={styles.submitTokenBtn} type='submit'>
                               { loading ? <LoadingBar /> : 'Join Contest' }
                            </button>
                          </form>
                          </div>
                      }
                 
                      </div>
                    }
           
                  </div>
                 <div className={styles.contestantDiv}>
                  <p style={{textAlign:"center",fontFamily:"Cookie",fontSize:'25px',letterSpacing:'1.5px',color:'teal',fontWeight:'600',borderBottom: '2px solid green'}}>
                   Contestant for this contest
                  </p>
                  <p style={{fontFamily:'monospace',padding:'10px',color:'brown'}}>
                    Total Contestant : {contestDetails?.contestant?.length}
                  </p>
                  </div>
                </div>
              </div>
             </>
           }
             
           </div>

           {
             noToken && <NoTokenPopup cancel={handleCross} examFee={contestDetails?.examFee ? contestDetails?.examFee : '0' } />
           }

           {
                      loginPopup && 
                      <div className={styles.loginDialog}>
                        <h3>Please Login first</h3>
                    
                           <button onClick={redirectLogin} style={{padding:'8px 12px',border:'none',borderRadius:'5px',backgroundColor:'blue',color:'white',fontWeight:'550',letterSpacing:'1.3px',marginTop:'10px'}}>
                             Login
                           </button>
                           <p style={{marginTop:"15px"}}>
                             Do not have account?
                             <button onClick={redirectSignup} style={{border:'none'}}>
                                 signUp
                             </button>
                           </p>
                        
                        <div onClick={handleCross} className={styles.cross}>
                          <div className={styles.line1}></div>
                          <div className={styles.line2}></div>
                        </div>
                      </div>
                    }

                    {
                      failed && 
                      <div className={styles.loginDialog}>
                        <p style={{padding:'20px',fontFamily:'Roboto',color:'brown',fontSize:'25px'}}>
                          Invalid token
                        </p>
                        <div onClick={handleCross} className={styles.cross}>
                          <div className={styles.line1}></div>
                          <div className={styles.line2}></div>
                        </div>
                      </div>
                    }

                    <Footer />
        </div>
    )
}

export async function getServerSideProps(ctx) {
  const cid = ctx.params?.cid;
  await db.connect();
  const contest = await Contest.findById(cid).lean()
  await db.disconnect();

  function convertDocToObj(doc) {
    doc._id = doc._id.toString();
    doc.contestDateAndTime = doc.contestDateAndTime.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
  
    return doc;
  }

  const details = convertDocToObj(contest);
  const contestDetails = {
    _id : details?._id,
    contestTitle : details?.contestTitle,
    contestDescription : details?.contestDescription,
    examFee: details?.examFee ? details.examFee : null,
    prizes : details?.prizes,
    contestTopic : details?.contestTopic,
    tokenSystem : details?.tokenSystem,
    contestDateAndTime : details?.contestDateAndTime,
    totalQuestion : details?.contestQuestion.length,
    contestant : details?.contestant?.map(c => {
      return {
        user: c.user.toString(),
        name: c.name
      }
    }),
    contestOrganizer : details?.contestOrganizer
  }

  if (!contest) {
      return {
         notFound: true,
      }
   }

  return { props: { contestDetails: contestDetails } }
}

export default QuizDetails
