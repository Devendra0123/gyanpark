import styles from "../styles/ContactUs.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from 'next/head'
import axios from 'axios';
import {useState} from 'react';
import Link from 'next/link'

const ContactUs = () => {
  const [message,setMessage] = useState('');
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [location,setLocation] = useState('');
  const [messageSending,setMessageSending] = useState(false);
  const [messageRequest,setMessageRequest] = useState('')

  const handleCross = () => {
    setMessageRequest('');
    setMessageSending(false)
  };

  const sendMessage = async(e)=>{
    e.preventDefault();
    if(!message || !email || !name || !location){
      setMessageRequest('Please fill all the fields')
      setMessageSending(false);
      return;
    }
   try{
    setMessageSending(true)
     await axios.post('/api/user/userMessage',{
      email,name,location,message
    })
    setMessageRequest('Message sent successfully')
    setMessageSending(false)
   }
   catch(err){
    setMessageSending(false)
    setMessageRequest('Sorry! please send again')
   }
  }
    return (
        <div className={styles.contactUs}>
         <Head>
          <title>Contact Us</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
            <Navbar />

            {messageRequest &&  <div style={{opacity:"60%",zIndex:"12",position:"absolute",width:"100%",height:"400vh",backgroundColor:"grey"}}></div>}

            {
                      messageRequest && 
                      <div className={styles.messageDialog}>
                        <p>
                          {messageRequest}
                        </p>
                        <div onClick={handleCross} className={styles.cross}>
                          <div className={styles.line1}></div>
                          <div className={styles.line2}></div>
                        </div>
                      </div>
                    }

            <div className={styles.contactUs_contaier}>
                
            <div className={styles.contactUs_contaier_right}>
                      <div className={styles.leaf_icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="green" width="24" height="24" viewBox="0 0 24 24"><path d="M15.787 7.531c-5.107 2.785-12.72 9.177-15.787 15.469h2.939c.819-2.021 2.522-4.536 3.851-5.902 8.386 3.747 17.21-2.775 17.21-11.343 0-1.535-.302-3.136-.92-4.755-2.347 3.119-5.647 1.052-10.851 1.625-7.657.844-11.162 6.797-8.764 11.54 3.506-3.415 9.523-6.38 12.322-6.634z"/></svg>
                      </div>
                  <div className="contact_info">
                    <div className={styles.flex}>
                        <div className={styles.icon}>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="grey" width="24" height="24" viewBox="0 0 24 24"><path d="M19 2c0-1.104-.896-2-2-2h-10c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-20zm-8.5 0h3c.276 0 .5.224.5.5s-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm1.5 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm5-3h-10v-14.024h10v14.024z"/></svg>
                        </div>
                        <h3 style={{marginLeft:"5px"}}>(+977)9807717694</h3>
                    </div>
                    <div className={styles.flex}>
                        <div className={styles.icon}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="grey" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
                        </div>
                        <h3 style={{marginLeft:"5px"}}>Kathmandu,Nepal</h3>
                    </div>
                    <div className={styles.flex}>
                        <div className={styles.icon}>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="grey" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg>
                        </div>
                        <h3 style={{marginLeft:"5px"}}>gyanpark49@gmail.com</h3>
                    </div>
                  </div>
                  <div className={styles.socialLink}>
                      <Link href='https://www.facebook.com/GyanPark-100766589216827/?notif_id=1645189900053041&notif_t=page_fan&ref=notif' passHref>
                       <div className={styles.socialIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="brown" width="34" height="34" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
                        </div>
                      </Link>
                      <Link href='https://www.instagram.com/gyanpark49/' passHref>
                      <div className={styles.socialIcon}>                   
                        <svg xmlns="http://www.w3.org/2000/svg" fill="brown" width="34" height="34" viewBox="0 0 24 24"><path d="M14.829 6.302c-.738-.034-.96-.04-2.829-.04s-2.09.007-2.828.04c-1.899.087-2.783.986-2.87 2.87-.033.738-.041.959-.041 2.828s.008 2.09.041 2.829c.087 1.879.967 2.783 2.87 2.87.737.033.959.041 2.828.041 1.87 0 2.091-.007 2.829-.041 1.899-.086 2.782-.988 2.87-2.87.033-.738.04-.96.04-2.829s-.007-2.09-.04-2.828c-.088-1.883-.973-2.783-2.87-2.87zm-2.829 9.293c-1.985 0-3.595-1.609-3.595-3.595 0-1.985 1.61-3.594 3.595-3.594s3.595 1.609 3.595 3.594c0 1.985-1.61 3.595-3.595 3.595zm3.737-6.491c-.464 0-.84-.376-.84-.84 0-.464.376-.84.84-.84.464 0 .84.376.84.84 0 .463-.376.84-.84.84zm-1.404 2.896c0 1.289-1.045 2.333-2.333 2.333s-2.333-1.044-2.333-2.333c0-1.289 1.045-2.333 2.333-2.333s2.333 1.044 2.333 2.333zm-2.333-12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.958 14.886c-.115 2.545-1.532 3.955-4.071 4.072-.747.034-.986.042-2.887.042s-2.139-.008-2.886-.042c-2.544-.117-3.955-1.529-4.072-4.072-.034-.746-.042-.985-.042-2.886 0-1.901.008-2.139.042-2.886.117-2.544 1.529-3.955 4.072-4.071.747-.035.985-.043 2.886-.043s2.14.008 2.887.043c2.545.117 3.957 1.532 4.071 4.071.034.747.042.985.042 2.886 0 1.901-.008 2.14-.042 2.886z"/></svg>
                        </div>
                      
                      </Link>
                  </div>
                </div>

                <div className={styles.contactUs_contaier_left}>
                    <form className={styles.form}>
                       <div className={styles.inputBox}>
                          <label className={styles.label}>Fullname</label>
                          <input 
                             className={styles.formInput}
                             type="text"
                             required={true}
                             name="user_name"
                             onChange={(e)=> setName(e.target.value)}
                             />
                       </div>
                       <div className={styles.inputBox}>
                          <label className={styles.label}>E-mail</label>
                          <input 
                             className={styles.formInput}
                             type="text"
                             required={true}
                             name="user_email"
                             onChange={(e)=> setEmail(e.target.value)}
                             />
                       </div>
                       <div className={styles.inputBox}>
                          <label className={styles.label}>Location</label>
                          <input 
                             className={styles.formInput}
                             type="text"
                             required
                             name="user_location"
                             onChange={(e)=> setLocation(e.target.value)}
                             />
                       </div>
                       <div className={styles.inputBox}>
                          <label className={styles.label}>Message</label>
                          <textarea 
                             className={styles.textarea}
                             required={true}
                             name="user_message"
                             onChange={(e)=> setMessage(e.target.value)}
                             />
                       </div>
                       {
                        messageSending ? 
                        <button style={{padding:'10px 15px',backgroundColor:'white',border:'none',borderRadius:'10px',color:'blue'}}>Wait...</button> :
                        <div className={styles.sendBox} onClick={sendMessage}>
                           <button className={styles.send_btn}>
                               Send
                           </button>
                           <div className={styles.sendIcon}>
                             <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" width="24" height="24" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/></svg>
                           </div>
                       </div>
                       }
                      
                    </form>
                </div>
             
            </div>
            <Footer />
        </div>
    )
}

export default ContactUs
