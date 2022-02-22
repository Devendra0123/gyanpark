import styles from "../../styles/QuizContest.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Quiz_card from "../../components/Quiz_card";
import db from "../../utils/db";
import Contest from '../../models/Contest';
import { useState } from "react";
import Head from 'next/head'

const QuizContest = ({comingContests,completedContest,liveContests}) => {

  const [completedContests,setCompletedContests] = useState(false);
  const [liveContest,setLiveContest] = useState(false)

  const handleCompletedContest = ()=>{
    setCompletedContests(true);
    setLiveContest(false)
  }

  const handleUpcomingContest = ()=>{
    setCompletedContests(false);
    setLiveContest(false)
  }

    return (
        <div className={styles.quizContest}>
         <Head>
           <title>Contest</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
            <Navbar activePage={6} />
        
            <div className={styles.quizContest_status}>
                <p onClick={handleUpcomingContest} className={`${styles.quizContest_status_text} ${(completedContests === false && liveContest === false) && styles.active}`}>
                  Upcoming Contest
                </p>
                <p onClick={()=> {
                setLiveContest(true);
                setCompletedContests(false);
                }
                } className={`${styles.quizContest_status_text} ${liveContest === true && styles.active}`}>
                  Live Contest
                </p>
                <p onClick={handleCompletedContest} className={`${styles.quizContest_status_text} ${(completedContests === true && liveContest === false) && styles.active}`}>
                   Completed Contest
                </p>
            </div>
            <div className={styles.quizContest_items}>
              {(completedContests === true && liveContest === false) &&
                completedContest?.map((contest,i)=>(
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
                      btnName='Completed'
                      contestLink={`/contest/${contest._id}/end-result`}
                      />
                  ))
              }

              {
                (completedContests === false && liveContest === false) &&
                  comingContests?.map((contest,i)=>(
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
                      btnName='join'
                      contestLink={`/contest/${contest._id}/details`}
                      />
                  ))
              }

              {
                (completedContests === false && liveContest === true) &&
                liveContests?.map((contest,i)=>(
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
                      btnName='join'
                      contestLink={`/contest/${contest._id}/details`}
                      />
                  ))
              }

            </div>

            <Footer />

        </div>
    )
}

export async function getStaticProps(ctx) {
   
    await db.connect();
    const upcomingContests = await Contest.find({contestDateAndTime: { $gte : new Date().toISOString() }}).select('-contestant -token').lean();
    const liveContests = await Contest.find({contestDateAndTime: { $lte : new Date().toISOString() },contestExpireTime: { $gte : new Date().toISOString() } }).select('-contestant -token').lean();
    const completedContests = await Contest.find({contestExpireTime: { $lte : new Date().toISOString() }}).select('-contestant -token').lean();
    await db.disconnect();
   
    function convertDocToObj(doc) {
        doc._id = doc._id.toString();
        doc.contestDateAndTime = doc.contestDateAndTime.toString();
        doc.createdAt = doc.createdAt.toString();
        doc.updatedAt = doc.updatedAt.toString();
      
        return doc;
      }

      function compare( a, b ) {
        if ( new Date(a.contestDateAndTime).getTime() < new Date(b.contestDateAndTime).getTime() ){
          return 1;
        }
        if ( new Date(a.contestDateAndTime).getTime() > new Date(b.contestDateAndTime).getTime() ){
          return -1;
        }
      }

    const liboContest = liveContests.map(item => convertDocToObj(item))
    const comingoContests = upcomingContests.map(item => convertDocToObj(item));
    const completedoContest = completedContests.map(item => convertDocToObj(item));

    const libContest = liboContest.sort(compare);
    const comingContests = comingoContests.sort(compare);
    const completedContest = completedoContest.sort(compare);
     return {
       props: {
         comingContests: comingContests.map(item => {
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
         liveContests: libContest.map(item => {
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
         completedContest: completedContest.map(item => {
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
        })
       },
       revalidate: 10,
     }
   }

export default QuizContest
