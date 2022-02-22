import styles from "../styles/Checkout.module.css";

const CheckoutSteps = ({activeStep}) => {
    return (
        <div className={styles.checkoutSteps}>
            <div className={styles.checkoutSteps_top}>
               <div className={`${styles.checkoutStep1} ${activeStep>=1  && styles.activeStep}`}>
                  1
                </div>
                <div className={`${styles.hrLine} ${activeStep>1  && styles.activeStep}`}></div>
                <div className={`${styles.checkoutStep1} ${activeStep>=2 && styles.activeStep}`}>
                  2
                </div>
                <div className={`${styles.hrLine} ${activeStep>2  && styles.activeStep}`}></div>
                <div className={`${styles.checkoutStep1} ${activeStep===3 && styles.activeStep}`}>
                  3
                </div>
              </div>
              <div className={styles.checkout_desc}>
                <p style={{fontFamily:"Roboto"}}> Shipping Details </p>
                <p style={{fontFamily:"Roboto",marginRight:"30px"}}> Confirm Details </p>
                <p style={{fontFamily:"Roboto",marginRight:"15px"}}> Payment </p>
              </div>
        </div>
    )
}

export default CheckoutSteps
