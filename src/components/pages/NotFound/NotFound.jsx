import styles from './notfound.module.css';
import notFound from '../../../assets/images/404.jpg';




const NotFound = (props) => {
  
    // const { state } = props.location;
    const { status } = props.match.params;
    const ErrorMessage =
        status === "404" ? "Not Found (404)" :
            status === "500" ? "500" :
                "Hly chka ed statusi errory";
    return (
        <div>
            <h1 className={styles.heading1} style={{ marginTop: "30px" }}>
                {ErrorMessage}
            </h1>
            <div className={styles.notFoundImage}>
                <img src={notFound} alt="" />
            </div>
        </div>
    );
}

export default NotFound;