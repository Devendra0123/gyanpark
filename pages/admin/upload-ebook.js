import styles from "../../styles/Product.module.css";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import React,{ useState,useContext,useEffect } from "react";
import { Store } from "../../utils/store";
import { useRouter } from "next/router";
import axios from 'axios';

const UploadEbook = () => {

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

    const categories = ["Medical","Engineering","Entrance Preparation","Others"];
    
      const [message, setMessage] = useState('');
      const [backblur, setBackblur] = useState(false);
      const [file,setFile] = useState([]);
      const [category,setCategory] = useState('');
      const [ebookName,setEbookName] = useState('');
      const [ebookPrice,setEbookPrice] = useState(null);
      const [description,setDescription] = useState('');
      const [authorName,setAuthorName] = useState('');
      const [previewImage,setPreviewImage] = useState([]);
      const [coverImage,setCoverImage] = useState('');
      const [coverFile,setCoverFile] = useState([]);
      const [ebookPdf,setEbookPdf] = useState('');
      const [pdfFile,setPdfFile] = useState([]);
      const [publicationName,setPublicationName] = useState('')

const uploadEbookImagesChange = (e)=>{
  const files = Array.from(e.target.files);
 
   if(e.target.name==='coverPhoto'){
     setCoverImage(files[0].name)
     setCoverFile(files);
   }
   if(e.target.name==='previewImages'){
     const pImages = files.map(file=>{
       return file.name
     })
     setPreviewImage(pImages);
     setFile(files);
   }
   if(e.target.name==='pdfFile'){
     setEbookPdf(files[0].name);
     setPdfFile(files);
   }
}


const handleClick = async(e)=>{
  e.preventDefault();
  file.push(coverFile[0]);
  file.push(pdfFile[0]);
 
  const body = new FormData();
  for (let index = 0; index <= file.length; index++) {
    const element = file[index];
    body.append('file', element)
  }
 
  try{
    const {data} = await axios.post(
      '/api/ebook/upload-ebook',                  
         {
           ebookName,
           ebookPrice,
           description,
           category,
           authorName,
           publicationName,
           previewImage,
           coverImage,
           ebookPdf   
         },             
        {headers: {
          'Content-Type': 'application/json'                          
        }
      }
    ) ;
  
    const res = await axios.post(
      '/api/ebook/upload-photo',                  
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
        <div className={styles.uploadEbook}>
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
  
            <div className={styles.uploadEbook_container}>
                <div></div>
                <h4 className={styles.uploadEbook_title}>
                    Upload E-book
                </h4>
                <form className={styles.form} onSubmit={handleClick}>
                  <div>
                   <select onChange={(e)=> setCategory(e.target.value)} className={styles.formSelect}>
                      <option value="">Choose Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                   </select>
                  </div>

                  <div>
                    <input 
                      onChange={(e)=> setEbookName(e.target.value)}
                      className={styles.formInput}
                      placeholder="Ebook name"
                      type="text" />
                  </div>

                  <div>
                    <input 
                      onChange={(e)=> setEbookPrice(e.target.value)}
                      className={styles.formInput}
                      placeholder="Price"
                      type="number" />
                  </div>
                  
                  <div>
                    <input 
                      onChange={uploadEbookImagesChange}
                      type='file' 
                      className={styles.coverPhotoInput}
                      name='coverPhoto'
                       />
                  </div>

                  <div>
                    <textarea 
                      onChange={(e)=> setDescription(e.target.value)}
                      className={styles.formTextArea}
                      placeholder="Ebook Description"
                       />
                  </div>

                  <div>
                    <input 
                      onChange={(e)=> setAuthorName(e.target.value)}
                      className={styles.formInput}
                      placeholder="Author name"
                      type="text" />
                  </div>

                  <div>
                    <input 
                      onChange={(e)=> setPublicationName(e.target.value)}
                      className={styles.formInput}
                      placeholder="Publication name"
                      type="text" />
                  </div>

                  <div>
                    <input
                      className={styles.pdfInput}
                      type="file"
                      name='pdfFile'
                      onChange={uploadEbookImagesChange}
                    />
                  </div>

                  
                  <div>
                    <input
                      onChange={uploadEbookImagesChange}
                      className={styles.previewImageInput}
                      type="file"
                      name='previewImages'
                    />
                  </div>

                  <button
                    className={styles.upload_btn}
                    type="submit">
                    Create
                  </button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default UploadEbook
