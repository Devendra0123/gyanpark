import { useState, useEffect, useRef } from 'react';
import styles from "../styles/WaitForChallenge.module.css";

const WaitForChallenge = ({contestDateAndTime,text,inactive,pageReload}) => {
    const [timerDays,setTimerDays] = useState('00');
    const [timerHours,setTimerHours] = useState('00');
    const [timerMinutes,setTimerMinutes] = useState('00');
    const [timerSeconds,setTimerSeconds] = useState('00');
  
    const interval = useRef();
  
    const startTimer = ()=>{
      const countdownTime = new Date(contestDateAndTime).getTime();
  
      interval = setInterval(()=>{
        const now = new Date().getTime();
        const distance = countdownTime - now;
        const days = Math.floor(distance/(1000*60*60*24));
        const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
        const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
        const seconds = Math.floor((distance % (1000*60)) / 1000 );
  
        if(distance < 0){
           clearInterval(interval);
           if(pageReload === true){
            window. location. reload()
           }
        }else{
          setTimerDays(days)
          setTimerHours(hours);
          setTimerMinutes(minutes);
          setTimerSeconds(seconds);
          if(days < 10){
            setTimerDays(`0${days}`)
          }
          if(hours < 10){
            setTimerHours(`0${hours}`)
          }
          if(minutes < 10){
            setTimerMinutes(`0${minutes}`)
          }
          if(seconds < 10){
            setTimerSeconds(`0${seconds}`)
          }
        }
      },1000)
    }

    
    useEffect(()=>{
      startTimer();
      return ()=>{
        clearInterval(interval);
      }
    })
  
    return (
        <div>
            <div className={styles.timer}>
                   <p style={{fontFamily:'Roboto',color: inactive === true ? 'white' : 'white',padding:'5px',opacity:'60%'}}> {text} </p>
                   <div className={`${ inactive === true ? styles.inactive : styles.countDown}`}>
                     <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'0 5px'}}>
                       <p> {timerDays} </p>
                       <span style={{fontSize:'12px',opacity:'70%'}}> Days </span>
                     </div>
                     <span> : </span>

                     <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'0 5px'}}>
                       <p> {timerHours} </p>
                       <span style={{fontSize:'12px',opacity:'70%'}}> Hrs </span>
                     </div>
                     <span> : </span>

                     <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'0 5px'}}>
                       <p> {timerMinutes} </p>
                       <span style={{fontSize:'12px',opacity:'70%'}}> Min </span>
                     </div>
                     <span> : </span>

                     <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'0 5px'}}>
                       <p> {timerSeconds} </p>
                       <span style={{fontSize:'12px',opacity:'70%'}}> Sec </span>
                     </div>
                   
                   </div>
                 </div>
        </div>
    )
}

export default WaitForChallenge
