import styles from "../../styles/Product.module.css";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import React,{ useState,useContext,useEffect } from "react";
import { Store } from "../../utils/store";
import { useRouter } from "next/router";
import axios from 'axios'
import Image from 'next/image'

const CreateProduct = () => {

  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

      const [name,setName] = useState('');
      const [price,setPrice] = useState('');
      const [description,setDescription] = useState('');
      const [category,setCategory] = useState('');
      const [stock,setStock] = useState('');
      const [productId,setProductId] = useState('')
      const [subCategory,setSubCategory] = useState('');
      const [file,setFile] = useState([]);
      const [message, setMessage] = useState('');
      const [backblur, setBackblur] = useState(false);
      const [images,setImages] = useState([]);

  useEffect(()=>{
    if(!userInfo){
      router.push('/user/login');     
    }
    if(userInfo?.isAdmin == false){
      router.push('/user/login');
    }
  },[userInfo,router])

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];

      const [imagesPreview, setImagesPreview] = useState([]);

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

      const handleUpdateProduct = async(e)=>{
        e.preventDefault();
        const body = new FormData();
        for (let index = 0; index <= file.length; index++) {
          const element = file[index];
          body.append('file', element)
        }
       
        try{
          const {data} = await axios.post(
            '/api/product/update-product',                  
               {
                 productId,
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
          );
        
          const res = await axios.post(
            '/api/product/upload-photo',                  
                 body,             
              {headers: {
                "Content-Type": "multipart/form-data"                          
              }
            }
          );
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
        <div className={styles.updateProduct}>
            <Navbar />
            <div className={styles.updateProduct_container}>
                <div className={styles.id_div}>
                    <input
                     className={styles.id_input}
                     onChange = {(e) => setProductId(e.target.value)}
                     placeholder="Enter Product ID"
                     type="text" />
                </div>
                <h4 className={styles.updateProduct_title}>
                    Update Product
                </h4>
                <form className={styles.form}>
                  <div>
                    <input 
                      className={styles.formInput}
                      placeholder="Product name"
                      onChange={(e)=> setName(e.target.value)}
                      type="text" />
                  </div>
                  <div>
                    <input 
                      className={styles.formInput}
                      onChange={(e)=> setPrice(e.target.value)}
                      placeholder="Price"
                      type="number" />
                  </div>

                  <div>
                    <textarea 
                      className={styles.formTextArea}
                      onChange={(e)=> setDescription(e.target.value)}
                      placeholder="Priduct Description"
                       />
                  </div>

                  <div>
                   <select className={styles.formSelect} onChange={(e)=> setCategory(e.target.value)}>
                      <option value="">Choose Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                   </select>
                  </div>

                  <div>
                   <select className={styles.formSelect}  onChange={(e)=> setSubCategory(e.target.value)}>
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
                      className={styles.formInput}
                      onChange={(e)=> setStock(e.target.value)}
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
                    className={styles.update_btn}
                    type="submit"
                    onClick={handleUpdateProduct}>
                    Update
                  </button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default CreateProduct
