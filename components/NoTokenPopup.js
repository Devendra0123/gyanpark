import styles from "../styles/NoTokenPopup.module.css";
import Link from 'next/link'
const NoTokenPopup = ({cancel,examFee}) => {
  
    return (
        <div className={styles.noTokenPopup}>
            <div onClick={cancel} className={styles.cross}>
              <div className={styles.line1}></div>
              <div className={styles.line2}></div>
            </div>
            <h3 style={{backgroundColor:'teal',color:'white',padding:'5px 10px',borderRadius:'10px'}}>
                To Get Token
            </h3>
            <p style={{marginTop:'5px'}}>
                You need to pay <span style={{color:'black',fontWeight:'600',fontSize:'18px'}}>Rs.{examFee}</span> in any of the given account and make sure to contact us to details given below.
            </p>
            <div className={styles.method}>
               <p style={{backgroundColor:'brown',color:'white',width:'max-content',marginTop:'5px',padding:'5px 10px',borderRadius:'10px'}}> Way to go </p>
               <ul style={{marginTop:'5px',backgroundColor:'brown',color:'white',padding:'5px 10px',borderRadius:'10px'}}>
                   <li style={{padding:'5px 10px'}}>1. Pay Rs.{examFee} to any of the given account </li>
                   <li style={{padding:'5px 10px'}}>2. Send screenshot of transaction to either our facebook or instagram page. </li>
                   <p style={{width:'100%',textAlign:'center'}}> OR </p>
                   <li style={{padding:'5px 10px'}}> Contact us at given information </li>
               </ul>
            </div>

            <p style={{marginTop:'5px'}}>
              Please do not share your token to anyone, since one token can be used by only one contestant.
            </p>
          <div className={styles.details}>
          <div className={styles.contactUs}>
                    <h5 style={{fontFamily:'Roboto',fontSize:'16px',color:'teal'}}>
                        Contact Details
                    </h5>
                <div className={styles.socialMediaIcons}>
                    <div style={{cursor:'pointer'}}>
                     <Link href='https://www.facebook.com/GyanPark-100766589216827/?notif_id=1645189900053041&notif_t=page_fan&ref=notif' passHref>
                     <svg xmlns="http://www.w3.org/2000/svg" fill='grey' width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
                     </Link>
                    </div>
                    <div style={{cursor:'pointer'}}>
                     <Link href='https://www.instagram.com/gyanpark49/' passHref>
                     <svg style={{marginLeft:'10px'}} fill='grey' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.829 6.302c-.738-.034-.96-.04-2.829-.04s-2.09.007-2.828.04c-1.899.087-2.783.986-2.87 2.87-.033.738-.041.959-.041 2.828s.008 2.09.041 2.829c.087 1.879.967 2.783 2.87 2.87.737.033.959.041 2.828.041 1.87 0 2.091-.007 2.829-.041 1.899-.086 2.782-.988 2.87-2.87.033-.738.04-.96.04-2.829s-.007-2.09-.04-2.828c-.088-1.883-.973-2.783-2.87-2.87zm-2.829 9.293c-1.985 0-3.595-1.609-3.595-3.595 0-1.985 1.61-3.594 3.595-3.594s3.595 1.609 3.595 3.594c0 1.985-1.61 3.595-3.595 3.595zm3.737-6.491c-.464 0-.84-.376-.84-.84 0-.464.376-.84.84-.84.464 0 .84.376.84.84 0 .463-.376.84-.84.84zm-1.404 2.896c0 1.289-1.045 2.333-2.333 2.333s-2.333-1.044-2.333-2.333c0-1.289 1.045-2.333 2.333-2.333s2.333 1.044 2.333 2.333zm-2.333-12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.958 14.886c-.115 2.545-1.532 3.955-4.071 4.072-.747.034-.986.042-2.887.042s-2.139-.008-2.886-.042c-2.544-.117-3.955-1.529-4.072-4.072-.034-.746-.042-.985-.042-2.886 0-1.901.008-2.139.042-2.886.117-2.544 1.529-3.955 4.072-4.071.747-.035.985-.043 2.886-.043s2.14.008 2.887.043c2.545.117 3.957 1.532 4.071 4.071.034.747.042.985.042 2.886 0 1.901-.008 2.14-.042 2.886z"/></svg>
                     </Link>
                    </div>
                </div>
                <p style={{padding:'5px 0px'}}>
                  Contact Number : 9807717694
                </p>
                <p style={{padding:'5px 0px'}}>
                  Email Id : gyanpark49@gmail.com
                </p>
            </div>
            <div className={styles.paymentOption}>
               <h5 style={{fontFamily:'Roboto',fontSize:'16px',color:'teal'}}>
                   Payment Details
               </h5>
               <p style={{padding:'5px 0px'}}>
                   Recharge(Ncell) : {process.env.esewaId}
               </p>
               <p style={{padding:'5px 0px'}}>
                   Esewa : {process.env.esewaId}
               </p>
               <p style={{padding:'5px 0px'}}>
                   Khalti : {process.env.khaltiId}
               </p>
               <p style={{padding:'5px 0px'}}>
                   NMB Bank Account : {process.env.nmbBankAccount}
               </p>
            </div>
          </div>
           
        </div>
    )
}

export default NoTokenPopup
