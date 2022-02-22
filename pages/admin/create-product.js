import styles from "../../styles/Product.module.css";
import Navbar from "../../components/Navbar"
import { useState,useContext,useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import { Store } from "../../utils/store";
import { useRouter } from "next/router";
import Image from 'next/image';

const CreateProduct = () => {

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


    const categories = ["All","Medical Entrance Book","Engineering Entrance Book","Philosophy","Religion/Spirituality"];
      const [message, setMessage] = useState('');
      const [backblur, setBackblur] = useState(false);
      const [imagesPreview, setImagesPreview] = useState([]);
      const [name,setName] = useState('');
      const [price,setPrice] = useState('');
      const [description,setDescription] = useState('');
      const [category,setCategory] = useState('');
      const [subCategory,setSubCategory] = useState('');
      const [stock,setStock] = useState('');
      const [images,setImages] = useState([]);
      const [file,setFile] = useState([]);

      const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setFile(files);
        setImagesPreview([]);
    
        files.forEach((file) => {
          setImages((old)=> [...old, file.name]);
          const reader = new FileReader();    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };

      const handleClick = async(e)=>{
        e.preventDefault();
  
        const body = new FormData();
        for (let index = 0; index <= file.length; index++) {
          const element = file[index];
          body.append('file', element)
        }
       
        try{
          const {data} = await axios.post(
            '/api/product/create-product',                  
               {
                 name,
                 price,
                 description,
                 images,
                 category,
                 stock   
               },             
              {headers: {
                'Content-Type': 'application/json'                          
              }
            }
          ) ;
        
          const res = await axios.post(
            '/api/product/upload-photo',                  
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
        <div className={styles.createProduct}>
            <Navbar />
            {backblur &&  <div style={{opacity:"60%",zIndex:"9",position:"absolute",width:"100%",height:"300vh",backgroundColor:"grey"}}></div>}
          
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
            <div className={styles.createProduct_container}>
                <div></div>
                <h4 className={styles.createProduct_title}>
                    Create Product
                </h4>
                <form className={styles.form}>
                  <div>
                    <input 
                      onChange={(e)=> setName(e.target.value)}
                      className={styles.formInput}
                      placeholder="Product name"
                      type="text" />
                  </div>
                  <div>
                    <input 
                      onChange={(e)=> setPrice(e.target.value)}
                      className={styles.formInput}
                      placeholder="Price"
                      type="number" />
                  </div>

                  <div>
                    <textarea 
                      onChange={(e)=> setDescription(e.target.value)}
                      className={styles.formTextArea}
                      placeholder="Priduct Description"
                       />
                  </div>

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
                   <select onChange={(e)=> setSubCategory(e.target.value)} className={styles.formSelect}>
                      <option value="">Choose Sub-category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                   </select>
                  </div>

                  <div>
                    <input 
                      onChange={(e)=> setStock(e.target.value)}
                      className={styles.formInput}
                      placeholder="Stock"
                      type="number" />
                  </div>

                  <div>
                    <input
                      className={styles.form_fileInput}
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={createProductImagesChange}
                      multiple
                    />
                  </div>

                  <div className={styles.image_preview_div}>
                    {imagesPreview.map((image, index) => (
                      <Image className={styles.preview_img} key={index} src={image} width={50} height={50} alt="Product Preview" />
                    ))}
                  </div>

                  <button
                    onClick={handleClick}
                    className={styles.create_btn}
                    type="submit">
                    Create
                  </button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default CreateProduct
