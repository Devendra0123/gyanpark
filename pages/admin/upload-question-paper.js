import styles from "../../styles/BoardQuestion.module.css";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import React,{ useState,useContext, useEffect } from "react";
import { Store } from "../../utils/store";
import { useRouter } from "next/router";
import axios from 'axios';
import Image from 'next/image'

const UploadQuestionPaper = () => {

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

    const levels = ["+2","Diploma","Bachelor"];
    let array = [];

    const [message, setMessage] = useState('');
    const [backblur, setBackblur] = useState(false);
    const [file,setFile] = useState([]);
    const [level,setLevel] = useState("");
    const [program,setProgram] = useState("");
    const [programYear,setProgramYear] = useState("");
    const [examYear,setExamYear] = useState("");
    const [questionPaper,setQuestionPaper] = useState([])
    const [imagesPreview,setImagesPreview] = useState([]);
    if(level === "+2"){
        array = ["science","management"];
    }if(level === "diploma"){
        array = ["dentalhygiene","opthalmicscience","staffnursing","pharmacologyscience","labtechnology"];
    }if(level === "Bachelor"){
        array = ["mbbs","bds","bbs","bscnursing","bba"]
    }
  
    const year = new Date().getFullYear();
    const years = Array.from(new Array(20), (v, idx) => year - idx);

    const uploadImagesChange = (e) => {
      const files = Array.from(e.target.files);
      setFile(files)
      setImagesPreview([]);
  
      files.forEach((file) => {
        setQuestionPaper((old)=> [...old, file.name]);
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    };

    const uploadQuestion = async(e)=>{
      e.preventDefault();

      const body = new FormData();
      for (let index = 0; index <= file.length; index++) {
        const element = file[index];
        body.append('file', element)
      }
     
      try{
        const {data} = await axios.post(
          '/api/question-paper/upload-question-paper',                  
             {
               program,
               programYear,
               examYear,
               questionPaper  
             },             
            {headers: {
              'Content-Type': 'application/json'                          
            }
          }
        ) ;
      
        const res = await axios.post(
          '/api/question-paper/upload-photo',                  
               body,             
            {headers: {
              "Content-Type": "multipart/form-data"                          
            }
          }
        ) ;
        if(data && res.status === 200){
          setBackblur(true);
         return setMessage(data.message);
        }if(res.status === 200){
          setBackblur(true);
          return setMessage('Only image is saved to disk')
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
        <div className={styles.uploadQuestionPaper}>
            <Navbar />

            {backblur &&  <div style={{opacity:"60%",zIndex:"9",position:"absolute",width:"100%",height:"100vh",backgroundColor:"grey"}}></div>}
          
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
            <div className={styles.uploadQuestionPaper_container}>
                <h4 className={styles.upload_question_title}>
                   Upload Question
                </h4>
                <form className={styles.form} onSubmit={uploadQuestion}>

                  <div>
                   <select className={styles.formSelect} onChange={(e) => setLevel(e.target.value)}>
                      <option value="">Choose Level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                   </select>
                  </div>

                  <div>
                   <select className={styles.formSelect} onChange={(e) => setProgram(e.target.value)}>
                      <option value="">Choose Program</option>
                      {array.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                   </select>
                  </div>

                  <div>
                   <select className={styles.formSelect} onChange={(e) => setProgramYear(e.target.value)}>
                      <option value="">Choose Program Year</option>
                      <option key="1" value="1">1st</option>
                      <option key="2" value="2">2nd</option>
                      <option key="3" value="3">3rd</option>
                      <option key="4" value="4">4th</option>
                      <option key="5" value="5">5th</option>
                   </select>
                  </div>

                  <div>
                   <select onChange={(e)=> setExamYear(e.target.value)} className={styles.formSelect}>
                      <option value="">Choose Exam Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                   </select>
                  </div>

                  <div>
                    <input
                      className={styles.selectImg}
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={uploadImagesChange}
                      multiple
                    />
                  </div>

                  <div className={styles.image_preview_div}>
                    {imagesPreview.map((image, index) => (
                      <Image className={styles.preview_img} key={index} src={image} width={50} height={50} alt="Product Preview" />
                    ))}
                  </div>

                  <button
                    className={styles.upload_btn}
                    type="submit">
                    Upload
                  </button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default UploadQuestionPaper
