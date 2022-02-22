import styles from "../styles/Quiz_contest.module.css";
import Link from "next/link";
import Image from 'next/image'
function Quiz_contest_home() {
    return (
        <div className={styles.quiz_contest_home}>
            <div className={styles.quiz_contest_home_info}>
              <h2 className={styles.quiz_contest_home_info_title}>
                  Quiz Contest
              </h2>
            </div>
            <div className={styles.quiz_contest_home_body}>
                <div className={styles.quiz_contest_home_body_joinContest}>
                    <div className={styles.quiz_contest_home_body_joinContest_info}>
                       <h2 className={styles.quiz_contest_home_body_joinContest_title}>
                           Join our weekly quiz contest and <span className={styles.quiz_contest_home_span}> win cash money and attractive prizes</span>
                       </h2>
                       <Link href="/contest" passHref>
                         <button className={styles.quiz_contest_home_body_joinContest_btn}>
                             Join Contest
                         </button>
                       </Link>
                       <div className={styles.quiz_contest_home_body_joinContest_illustration}>
                          <div className={styles.quiz_contest_home_body_joinContest_div}>
                              <div className={styles.quiz_contest_home_body_joinContest_div_top}>🌟🌟🌟</div>
                              <div className={styles.quiz_contest_home_body_joinContest_div_bottom}>
                                  <p>SignUp to join the contest</p>
                              </div>
                          </div>
                          <div className={styles.quiz_contest_home_body_joinContest_div}>
                              <div className={styles.quiz_contest_home_body_joinContest_div_top}>🌟🌟🌟</div>
                              <div className={styles.quiz_contest_home_body_joinContest_div_bottom}>
                                  <p>Prizes for winners and the lucky one</p>
                              </div>
                          </div>
                          <div className={styles.quiz_contest_home_body_joinContest_div}>
                              <div className={styles.quiz_contest_home_body_joinContest_div_top}>🌟🌟🌟</div>
                              <div className={styles.quiz_contest_home_body_joinContest_div_bottom}>
                                  <p>Get cash directly to your bank or e-sewa account</p>
                              </div>
                          </div>
                       </div>
                    </div>
                    <div className={styles.quiz_contest_home_body_joinContest_image}>
                        <Image  
                        className={styles.quiz_contest_home_body_joinContest_img}
                        src="https://freightways.eu/wp-content/uploads/2021/01/champion-cup.jpg" width={400} height={500} alt="" />

                    </div>
                </div>

                <div className={styles.quiz_contest_home_body_createContest}>
                    <h2>
                        Want to create contest?
                    </h2>
                    <Link href="/contact-us" passHref>
                        <button className={styles.quiz_contest_home_body_createContest_btn}>
                            Contact Us
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Quiz_contest_home
