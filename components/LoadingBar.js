import styles from "../styles/Home.module.css";

const LoadingBar = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.loadingCircle}></div>
        </div>
    )
}

export default LoadingBar
