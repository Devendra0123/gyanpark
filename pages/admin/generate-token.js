import styles from "../../styles/Token.module.css";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useState,useContext,useEffect } from "react";
import { getRandomString } from "../../utils/randomBytes";
import axios from 'axios';
import Contest from "../../models/Contest";
import db from "../../utils/db";
import { Store } from "../../utils/store";
import { useRouter } from "next/router";

const GenerateToken = ({ contests }) => {

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

    const [activeHeader,setActiveHeader] = useState(1);
    const [numOfToken,setNumOfToken] = useState(null);
    const [message, setMessage] = useState('');
    const [backblur, setBackblur] = useState(false);
    const [contestId,setContestId] = useState('');
    const [selectedContestToken,setSelectedContestToken] = useState(null);
    const [selectedContestContestant,setSelectedContestContestant] = useState(null);
    const [loadingBtn,setLoadingBtn] = useState();
    const [givenToken,setGivenToken] = useState([]);
    const [freshToken,setFreshToken] = useState([]);
    const [tokenType,setTokenType] = useState('freshToken')
    const generatedTokens = [];
    const [tickedTokens,setTickedTokens] = useState([]);
    const [tokenKeyword,setTokenKeyword] = useState('');
    const [searchedToken,setSearchedToken] = useState([]);

    const generateToken = async(e)=>{
        e.preventDefault();
        for(let i = 0; i < numOfToken; i++){
           const randomString =  getRandomString(8);
           const token = {token: randomString}
           generatedTokens.push(token);
        }
        try{
          const {data} = await axios.post('/api/contest/generate-token',{
              contestId,
              tokens: generatedTokens
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

    const handleContestClick = (cId)=>{
      setContestId(cId);
  
      const contest = contests.find(c => c._id === cId);
      if(contest?.token){
        setSelectedContestToken(contest.token);
         const freshToken = contest.token?.filter(t => !t.given || t.given===false );
         setFreshToken(freshToken);

         const givenToken = contest.token?.filter(t => t.given === true );
         setGivenToken(givenToken);
      }
    if(contest?.contestant){
      setSelectedContestContestant(contest.contestant);
      return;
    }
    }

    // Tick provided token
    const handleProvideToken = async(tokenId,index)=>{
      setLoadingBtn(index);

        try{
          const {data} = await axios.post('/api/contest/tick-token',{
            contestId,
            tokenId
          });
          if(data){
            setLoadingBtn();
            setTickedTokens((old)=> [...old, index]);
          }
        }
        catch(err){
          setLoadingBtn();
        }
    }

    const searchTokenHandler = (e)=>{
         setTokenKeyword(e.target.value);
         console.log(e.target.value)
        const searchedToken = selectedContestToken?.filter(t => t.token.toLowerCase() === e.target.value.toLowerCase());
        console.log(searchedToken)
        setSearchedToken(searchedToken);
    }

    return (
        <div className={styles.generateToken}>
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
           <div className={styles.tokenHeaders}>
               <p onClick={()=> setActiveHeader(1)} className={`${styles.headerTitle} ${activeHeader === 1 && styles.active}`}>
                   Generate token
               </p>

               <p onClick={()=> setActiveHeader(2)} className={`${styles.headerTitle} ${activeHeader === 2 && styles.active}`}>
                   All token
               </p>

               <p onClick={()=> setActiveHeader(3)} className={`${styles.headerTitle} ${activeHeader === 3 && styles.active}`}>
                   All Contestants
               </p>
           </div>

         <div className={styles.contestLists}>
           {
             contests?.map(c => (
               <div onClick={()=> handleContestClick(c._id)} key={c._id} className={`${styles.contestListItem} ${contestId === c._id && styles.activeContest}`}>
                 <p style={{fontFamily:'monospace',fontWeight:'600',fontSize:'17px'}}> { c.contestTitle } </p>
                 <p style={{fontFamily:'Roboto',fontSize:'13px'}}> { c._id } </p>
               </div>
             ))
           }
         </div>
       

           {
            activeHeader === 1 &&
            <form className={styles.generateTokenForm} onSubmit={generateToken}>
                <p style={{fontFamily:'Cookie',fontSize:'25px',color:'brown',fontWeight:'600',letterSpacing:'1.5px'}}>
                    Generate Token
                </p>
                <input 
                  className={styles.formInput}
                  onChange={(e)=> setContestId(e.target.value)}
                  type='text'
                  required={true}
                  placeholder='Enter contest Id' />

                <input
                  className={styles.formInput}
                  onChange={(e)=> setNumOfToken(e.target.value)}
                  type='number'
                  required={true}
                  placeholder='Number of tokens' />  

                <button type='submit' className={styles.submitBtn}>
                    Generate
                </button>  
            </form>
           }
        
        <div className={styles.tokenLists}>
           {
            (contestId && activeHeader === 2) && 
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 15px',marginTop:'10px',fontFamily:'Roboto',color:'white',backgroundColor:'brown',borderRadius:'10px'}}>
                <p onClick={()=> setTokenType('freshToken')} style={{padding:'0 10px',cursor:'pointer',borderRight:'2px solid grey'}}>
                  Fresh Token
                </p>
                <p onClick={()=> setTokenType('givenToken')} style={{padding:'0 10px',cursor:'pointer'}}>
                  Given Token
                </p>
              </div> 
              <div className={styles.tokenTally}>
                 <input
                  type='text'
                  placeholder='Enter token'
                  onChange={searchTokenHandler}
                  style={{border:'2px solid green',fontWeight:'600',outline:'none',marginTop:'10px',borderRadius:'10px',fontSize:'16px',padding:'7px 10px',letterSpacing:'2px',color:'brown'}}
                   />
                   {
                     tokenKeyword && 
                     <div>
                       {
                        searchedToken?.map((s,i) => (
                          <div key={i} className={styles.message}>
                          <div onClick={()=> {
                         setTokenKeyword('');
                         }} className={styles.cross}>
                         <div className={styles.line1}></div>
                         <div className={styles.line2}></div>
                       </div>
                       <div className={styles.tokenListItem}>
                           <p style={{display:'flex',justifyContent:'flex-start'}}>
                              {s.token}
                           </p>
                           
                             <button disabled={loadingBtn === i || s.given === true ? true : false} onClick={()=> handleProvideToken(s._id,i)} className={styles.tokenListItem_btn}>
                                { s.given === true ?  '✔' : 'Give' }
                             </button>
                        </div>
                          </div>
                        ))
                       }
                     </div>
                   }
              </div>
            {tokenType === 'freshToken' ? freshToken?.map((t,i) => (
              <div key={i} className={styles.tokenListItem}>
                 <p style={{display:'flex',justifyContent:'flex-start'}}>
                   {i+1}) {t.token}
                 </p>
                 {
                  tickedTokens.includes(i)
                   ? <button style={{backgroundColor:'teal',padding:'10px',borderRadius:'50%',border:'none',color:'white',fontSize:'17px',fontWeight:'600'}}> ✔ </button>   
                   :  
                   <button disabled={loadingBtn === i ? true : false} onClick={()=> handleProvideToken(t._id,i)} className={styles.tokenListItem_btn}>
                     Give
                   </button>
    
                 }
              </div>
            )):
            givenToken?.map((t,i) => (
              <div key={i} className={styles.tokenListItem}>
                 <p style={{display:'flex',justifyContent:'flex-start'}}>
                   {i+1}) {t.token}
                 </p>
                 <button style={{backgroundColor:'teal',padding:'10px',borderRadius:'50%',border:'none',color:'white',fontSize:'17px',fontWeight:'600'}}> ✔ </button>   
              </div>
            ))
            }
            </div>
            }
        </div>

           <div>
             {
              (selectedContestContestant && activeHeader === 3) && 
              <div className={styles.contestantWithToken}>
               <p>
                 Total Contestant : {selectedContestContestant?.length}
               </p>
               {selectedContestContestant.map((c,i) => (
                <div key={i} className={styles.tokenListItem}>
                  <p>
                    {i + 1}. { c.name }
                    {
                    c.token && 
                    <small> ({c.token}) </small>
                    }
                  </p>
                </div>
              ))}
              </div>
             }
           </div>
           <Footer />
        </div>
    )
}

export async function getServerSideProps(ctx) {
    await db.connect();
    const allContest = await Contest.find({contestExpireTime: { $gte : new Date().toISOString() }}).select('contestTitle token contestant').lean()
    await db.disconnect();

 function convertDocToObj(doc) {
    doc._id = doc._id.toString();
    return doc;
  }
    const c = allContest?.map(contest => {
      return {
        _id: contest?._id.toString(),
        contestTitle: contest.contestTitle,
        token: contest?.token?.map(convertDocToObj),
        contestant: contest?.contestant?.map(c=>{
          return {
            name: c.name,
            phoneNumber: c.phoneNumber,
            token: c.token ? c.token : 'no token'
          }
        })
      }
    })
    if (!allContest) {
        return {
           notFound: true,
        }
     }
  
    return { props: { contests: c } }
  }

export default GenerateToken
