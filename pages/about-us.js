import styles from "../styles/AboutUs.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from 'next/head'

const AboutUs = () => {
    return (
        <div className={styles.aboutUs}>
         <Head>
           <title>About Us</title>
           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
          <Navbar />
            <div className={styles.aboutUs_top}>
                <button className={styles.aboutUs_btn}>
                    About Us
                </button>
            </div>
            <div className={styles.aboutUs_middle}>
                <p className={styles.paragraph}>
                    <span>🎀</span> We are providing platform for the students, so that they could realise their potential by taking part in the contest.
                </p>
                <p className={styles.paragraph}>
                    <span>🎀</span> We are providing students with e-book on different topics, question paper and solution.
                </p>
                <p className={styles.paragraph}>
                    <span>🎀</span> Pointing fact as it is in the form of our blog post is also one thing we want to work on constantly. 
                </p>
                <p className={styles.paragraph}>
                    <span>🎀</span> We sell some of our quality products as well.
                </p>
                <p className={styles.paragraph}>
                    Although we serve most of our contents to the students, we are not specific about any category or any thing. We do not have any goal but we want to provide content which will open up eye for the one who is reallly serious about life.
                </p>
            </div>
            <div className={styles.aboutUs_bottom}>
               
            </div>

            <Footer />
        </div>
    )
}

export default AboutUs
