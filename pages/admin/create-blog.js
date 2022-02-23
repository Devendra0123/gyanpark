import styles from "../../styles/Product.module.css";
import Navbar from "../../components/Navbar"
import {useState,useContext,useEffect} from "react"
import axios from 'axios';
import Footer from "../../components/Footer";
import { Store } from "../../utils/store";
import { useRouter } from "next/router";
import Image from 'next/image'

const CreateBlog = () => {
  const router = useRouter();
    const categories = ["Personal","Relationship","Life","Travel","Food","Education",'Other'];
 
    const { state } = useContext(Store);
    const { userInfo } = state;
    useEffect(()=>{
      if(!userInfo){
        router.push('/user/login');     
      }
      if(userInfo?.isAdmin == false){
        router.push('/user/login');
      }
    },[userInfo,router]);
      const [message, setMessage] = useState('');
      const [backblur, setBackblur] = useState(false);
      const [category,setCategory] = useState('');
      const [title,setTitle] = useState('');
      const [createdAt,setCreatedAt] = useState(null);
      const [titleImage,setTitleImage] = useState('');
      const [imagesPreview,setImagesPreview] = useState([]);
      const [file, setFile] = useState([]);
      const [titleFile,setTitleFile] = useState([])
      const [inputList, setInputList] = useState([
        { title: "", subtitle: "", descDetail: "", images: [] }
      ]);

 
      // handle change in input
      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];

            list[index][name] = value;

        setInputList(list);
      };

      // Handle Images
      const createBlogImagesChange = (e,i) => {
        const {name} = e.target;
        const list = [...inputList];
        const files = Array.from(e.target.files);
        if(name === 'titleImage'){
          setTitleImage(files[0].name);
          setTitleFile(files);
        }else{
          list[i].images = files.map(file=>{
            return file.name
          });
          setFile(files);
        }
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };

      // handle click event of the Remove button
      const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
    
      // handle click event of the Add button
      const handleAddClick = () => {
        setInputList([
          ...inputList,
          {
            descriptionTitle: "",
            descriptionSubtitle: "",
            descripton: "",
            descriptionImage: ""
          }
        ]);
      };

      // Submit Blog Details
      const handleClick = async(e)=>{
        e.preventDefault();
        file.push(titleFile[0]);

        const body = new FormData();
        for (let index = 0; index <= file.length; index++) {
          const element = file[index];
          body.append('file', element)
        }

        try{
        
          const {data} = await axios.post(
            '/api/blog/create-blog',                  
               {
                title,
                titleImage,
                category,
                description : inputList   
               },             
              {headers: {
                'Content-Type': 'application/json'                          
              }
            }
          ) ;
        
          const res = await axios.post(
            '/api/blog/upload-photo',                  
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
            {backblur &&  <div style={{opacity:"60%",zIndex:"9",position:"absolute",width:"100%",height:"500vh",backgroundColor:"grey"}}></div>}

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
                    Create Blog
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
                      onChange={(e)=> setTitle(e.target.value)}
                      className={styles.formInput}
                      placeholder="Enter Blog title"
                      type="text" />
                  </div>

                  <div>
                    <input 
                      onChange={(e)=> setCreatedAt(e.target.value)}
                      className={styles.formInput}
                      type="date" />
                  </div>

                  <div>
                    <input
                      onChange={createBlogImagesChange}
                      className={styles.form_fileInput}
                      type="file"
                      name="titleImage"
                      accept="image/*"
                      multiple
                    />
                  </div>

                  {inputList.map((x, i) => {
                    return (
                      <div key={i} className={styles.description}>
                        <div>
                          <input 
                            name="title"
                            className={styles.formInput}
                            placeholder="Description Title"
                            type="text"
                            onChange={(e) => handleInputChange(e, i)}
                             />
                        </div>

                             <div>
                               <input 
                                 name="subtitle"
                                 className={styles.formInput}
                                 placeholder="Description Subtitle"
                                 type="text"
                                 onChange={(e) => handleInputChange(e, i)}
                                  />
                             </div>
            
                              <div>
                                <textarea 
                                 name="descDetail"
                                  className={styles.formTextArea}
                                  placeholder="Priduct Description"
                                  onChange={(e) => handleInputChange(e, i)}
                                   />
                              </div>
            
                              <div>
                                <input
                                  onChange={(e)=> createBlogImagesChange(e,i)}
                                  className={styles.form_fileInput}
                                  type="file"
                                  name="descriptionImage"
                                  accept="image/*"
                                  multiple
                                />
                              </div>

                              <div className={styles.btn_box}>
                          {inputList.length !== 1 && (
                            <button className={styles.removeBtn} onClick={() => handleRemoveClick(i)}>
                              Remove
                            </button>
                          )}
                          {inputList.length - 1 === i && (
                            <button className={styles.addMore_btn} onClick={handleAddClick}>Add</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className={styles.image_preview_div}>
                    {imagesPreview.map((image, index) => (
                      <Image className={styles.preview_img} key={index} src={image} width={50} height={50} alt="Product Preview" />
                    ))}
                  </div>

                  <button
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

export default CreateBlog
