import React from 'react';
import db from '../../../utils/db';
import Contest from '../../../models/Contest';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import styles from "../../../styles/Contest.module.css";
import Quiz_card from '../../../components/Quiz_card';

const Bontest = ({contest}) => {

    function compare( a, b ) {
        if ( new Date(a.contestDateAndTime).getTime() < new Date(b.contestDateAndTime).getTime() ){
          return 1;
        }
        if ( new Date(a.contestDateAndTime).getTime() > new Date(b.contestDateAndTime).getTime() ){
          return -1;
        }
      }
      const contests = contest.sort(compare);
  return (<div className={styles.contest}>
     <Navbar />
     {
        contests?.length > 0 ?
          contests?.map((contest,i)=>(
                    <Quiz_card key={i}
                      contestTitle = {contest.contestTitle}
                      contestDateAndTime = {new Date(contest.contestDateAndTime).toString()}
                      topicList = {contest.contestTopic}
                      numbOfQue = {contest.contestQuestionLength}
                      organizerName = {contest.contestOrganizer.name} 
                      contestTime = {new Date(contest.contestDateAndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                      contestPrize = {contest.prizes}
                      contestId = {contest._id}
                      examFee={contest.examFee}
                      btnName='see results'
                      contestLink={`/contest/${contest._id}/end-result`}
                      />
                  ))
                  : 
                  <p style={{color:'black',fontFamily:'Roboto',padding:'5px 10px',borderRadius:'10px',backgroundColor:'pink',marginTop:'20px'}}> You have not taken part in any contest </p>
              }
              <Footer />
  </div>);
};

export async function getServerSideProps(ctx) {
    const uid = ctx.params?.uid;
    await db.connect();
    const contest = await Contest.find({}).select('-token').lean();
    await db.disconnect();
  
    function convertDocToObj(doc) {
      doc._id = doc._id.toString();
      doc.contestDateAndTime = doc.contestDateAndTime.toString();
      doc.createdAt = doc.createdAt.toString();
      doc.updatedAt = doc.updatedAt.toString();   
      return doc;
    }
    const filterContest = contest?.map(item => convertDocToObj(item))
 
     if(!filterContest){
         return {
             props: {
                 contests: []
             }
         }
     }
     return {
       props: {
        contest: filterContest.map(item => {
           return {
             _id: item._id,
             contestTitle: item.contestTitle,
             contestDescription: item.contestDescription,
             contestTopic: item.contestTopic,
             examFee: item.examFee,
             prizes: item.prizes,
             contestDateAndTime: item.contestDateAndTime,
             contestOrganizer: item.contestOrganizer,
             contestQuestionLength: item.contestQuestion.length
           }
         }),
       }
    }
  }
export default Bontest;
