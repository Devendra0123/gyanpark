import styles from "../../styles/CreateContest.module.css";
import Navbar from "../../components/Navbar"
import axios from 'axios';
import { useState,useContext,useEffect } from "react";
import Footer from "../../components/Footer";
import { Store } from "../../utils/store";
import { useRouter } from "next/router";

const CreateContest = () => {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(()=>{
    if(!userInfo){
      router.push('/user/login');     
    }
    if(userInfo?.isAdmin == false){
      router.push('/user/login');
    }
  },[userInfo,router])

  const [message, setMessage] = useState('');
  const [backblur, setBackblur] = useState(false);
    const [tokenSystem,setTokenSystem] = useState('');
    const [contestTitle,setContestTitle] = useState('');
    const [contestDescription,setContestDescription] = useState('');
    const [contestPrize,setContestPrize] = useState('');
    const [contestDateAndTime,setContestDateAndTime] = useState(null);
    const [organizerName,setOrganizerName] = useState('');
    const [organizerPhoneNumber,setOrganizerPhoneNumber] = useState(null);
    const [organizerEmail,setOrganizerEmail] = useState('');
    const [organizerLocation,setOrganizerLocation] = useState('');
    const [examFee,setExamFee] = useState(null);
    const [contestExpireTime,setContestExpireTime] = useState(null)
    const [topicList, setTopicList] = useState(['']);
    const [inputList, setInputList] = useState([
        {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correctOption: "",
          time:'',
          solution:''
        }
      ]);
      
      // handle input change of topic list
      const handleTopicChange = (e, index) => {
        const { value } = e.target;   
        const list = [...topicList];
       
        list[index] = value; 
        setTopicList(list);
      };
   
      // Handle add more topic
      const handleAddTopic = () => {
        setTopicList([
          ...topicList,
          ''
        ]);
      };

      // Handle remove topic
      const handleRemoveTopic = (index) => {
        const list = [...topicList];
        list.splice(index, 1);
        setTopicList(list);
      };

      // Handle question paper input change
      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
    
        const list = [...inputList];
        if (e.target.name === `correctOption+${index}`) {
          list[index].correctOption = e.target.value;
        } else {
          list[index][name] = value;
        }
    
        setInputList(list);
      };

      // Handle add more question
      const handleAddClick = () => {
        setInputList([
          ...inputList,
          {
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctOption: "",
            time:'',
            solution: ""
          }
        ]);
      };
    
      // Handle remove question
      const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };

      // Handle create contest
      const handleSubmit = async()=>{
            try{      
              const contestDetails = {
                contestTitle,
                contestDescription,
                contestTopic: topicList,
                tokenSystem,
                prizes: contestPrize,
                examFee,
                contestDateAndTime,
                contestOrganizer: {
                  name: organizerName,
                  phoneNumber: organizerPhoneNumber,
                  email: organizerEmail,
                  location: organizerLocation
                },
                contestQuestion: inputList,
                contestExpireTime 
              }

              const {data} = await axios.post('/api/contest/create-contest',
               contestDetails,
               {headers: {
                'Content-Type': 'application/json'                          
                   }
                 });

                 if(data){
                  setBackblur(true);
                 return setMessage(data.message);
                }else{
                  setBackblur(true);
                  setMessage('Sorry! something went wrong')
                } 
            }
            catch(err){
              setBackblur(true);
              setMessage('Sorry! something went wrong')
            }
      }

    return (
        <div className={styles.createContest}>
            <Navbar />
            {backblur &&  <div style={{opacity:"60%",zIndex:"9",position:"absolute",width:"100%",height:"1000vh",backgroundColor:"grey"}}></div>}
          
          {
            message && <div className={styles.message}>
            <div onClick={()=> {
              setMessage(false);
              setBackblur(false)
              }} className={styles.cross}>
              <div className={styles.line1}></div>
              <div className={styles.line2}></div>
            </div>
              <h2 style={{fontFamily:"Roboto",fontSize:"18px",color:"brown",textAlign:"center"}}>
                {message}
              </h2>
            </div>
          }

            <div className={styles.createContest_container}>
                <div className={styles.createContest_container_left}>
                    <fieldset className={styles.fieldset}>
                        <input 
                         onChange = {(e)=> setContestTitle(e.target.value)}
                         placeholder="Contest title"
                         className={styles.textInput} type="text" />
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <input 
                         onChange = {(e)=> setExamFee(e.target.value)}
                         placeholder="Exam fee"
                         className={styles.textInput} type="number" />
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                       {topicList?.map((list,i)=>(
                        <fieldset key={i} className={styles.fieldset}>
                         <input 
                           style={{border:'none',backgroundColor: 'skyblue',padding: '5px 10px',borderRadius:'5px'}}
                           onChange={(e) => handleTopicChange(e, i)}
                           placeholder="Enter topic"
                           name='topic' 
                           type='text' />
                         <div className={styles.btn_box}>
                              {topicList.length !== 1 && (
                                <button className={styles.removeBtn} onClick={() => handleRemoveTopic(i)}>
                                  Remove
                                </button>
                              )}
                              {topicList.length - 1 === i && (
                                <button className={styles.addMore_btn} onClick={handleAddTopic}>Add topic</button>
                              )}
                         </div>
                         </fieldset>
                       ))}
                       </fieldset>
           

                    <fieldset style={{height:"80px"}} className={styles.fieldset}>
                        <textarea 
                          onChange={(e)=> setContestDescription(e.target.value)}
                          placeholder="Contest description"
                          className={styles.textarea} />
                    </fieldset>

                    <fieldset style={{height:"80px"}} className={styles.fieldset}>
                        <textarea 
                         onChange={(e)=> setContestPrize(e.target.value)}
                         placeholder="Do you have prize for this contest?"
                         className={styles.textarea}/>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Token System</legend>
                        <select onChange={(e)=> setTokenSystem(e.target.value)} className={styles.formSelect}>
                        <option value="">Choose</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                   </select>
                    </fieldset>
    
                       <fieldset className={styles.fieldset}>
                           <legend className={styles.legend}>Contest date && time </legend>
                           <input 
                             onChange={(e)=> setContestDateAndTime(e.target.value)}
                             className={styles.textInput} type="datetime-local" />
                       </fieldset>

                       <fieldset className={styles.fieldset}>
                           <legend className={styles.legend}>Contest expire time</legend>
                           <input 
                             onChange={(e)=> setContestExpireTime(e.target.value)}
                             className={styles.textInput} type="datetime-local" />
                       </fieldset>


                    <fieldset style={{border:"2px solid grey"}} className={styles.fieldset}>
                        <legend className={styles.legend}>Organizer</legend>
                        <input 
                         className={styles.organizertextInput}
                         onChange={(e)=> setOrganizerName(e.target.value)}
                         placeholder="Organizer name"
                         type="text" />

                        <input 
                         className={styles.organizertextInput}
                         onChange={(e)=> setOrganizerPhoneNumber(e.target.value)}
                         placeholder="Organizer Phone Number"
                         type="number" />

                        <input 
                         className={styles.organizertextInput}
                         onChange={(e)=> setOrganizerEmail(e.target.value)}
                         placeholder="Organizer email"
                         type="email" />

                        <input 
                         className={styles.organizertextInput}
                         onChange={(e)=> setOrganizerLocation(e.target.value)}
                         placeholder="location"
                         type="text" />
                    </fieldset>
                    
                </div>
                <div className={styles.createContest_container_right}>

                       {inputList.map((x, i) => (
                        <div key={i} className={styles.createContest_container_right_create_question}>
                           <div>
                               <span style={{borderRight:"4px solid coral", padding:"5px"}}>{i + 1}</span>
                           </div>
                          <div className={styles.questionBox}>
                            <div style={{width:"100%"}}>
                              <input
                                className={styles.questionInput}
                                name="question"
                                placeholder="Enter Question"
                                value={x.question}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </div>
                            <div className={styles.optionAndTimer_container}>
                              <div className={styles.option_container}>
                              <div className={styles.optionDiv}>
                              <input
                                className={styles.optionInput}
                                name="option1"
                                placeholder="Enter Option1"
                                value={x.option1}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <input
                                className={styles.radioBtn}
                                name={`correctOption+${i}`}
                                type="radio"
                                value={1}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </div>
                
                            <div className={styles.optionDiv}>
                              <input
                                className={styles.optionInput}
                                name="option2"
                                placeholder="Enter Option2"
                                value={x.option2}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <input
                                className={styles.radioBtn}
                                name={`correctOption+${i}`}
                                type="radio"
                                value={2}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </div>
                
                            <div className={styles.optionDiv}>
                              <input
                                className={styles.optionInput}
                                name="option3"
                                placeholder="Enter Option3"
                                value={x.option3}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <input
                                className={styles.radioBtn}
                                name={`correctOption+${i}`}
                                type="radio"
                                value={3}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </div>

                            <div className={styles.optionDiv}>
                              <input
                                className={styles.optionInput}
                                name="option4"
                                placeholder="Enter Option4"
                                value={x.option4}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <input
                                className={styles.radioBtn}
                                name={`correctOption+${i}`}
                                type="radio"
                                value={4}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </div>
                              </div>
                              <input 
                                onChange={(e) => handleInputChange(e, i)}
                                name='time'
                                placeholder='Time'
                                className={styles.organizertextInput}
                                style={{marginLeft:'10px',color:'white',backgroundColor:'black'}}
                                type='number' />
                            </div>
                            <div style={{width:"100%",marginTop:"10px"}}>
                              <textarea
                                className={styles.solutionTextarea}
                                onChange={(e) => handleInputChange(e, i)}
                                value={x.solution}
                                name="solution"
                                placeholder="Provide solution."
                              />
                            </div>
                            <div className={styles.btn_box}>
                              {inputList.length !== 1 && (
                                <button className={styles.removeBtn} onClick={() => handleRemoveClick(i)}>
                                  Remove
                                </button>
                              )}
                              {inputList.length - 1 === i && (
                                <button className={styles.addMore_btn} onClick={handleAddClick}>Add more question</button>
                              )}
                            </div>
                          </div>
                          </div>
                    ))}
                    
                </div>
            </div>
            <button onClick={handleSubmit} style={{color:'white',fontSize:'15px',marginTop:'15px',padding:'10px 15px',borderRadius:'5px',backgroundColor:'crimson',border:'none'}}>
              Create Contest
            </button>

            <Footer />
        </div>
    )
}

export default CreateContest
