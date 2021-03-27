import styles from './notfound.module.css';
import notFound from '../../../assets/images/404.jpg';




const NotFound = (props) => {
   
    return (
        <div>
            <h1 className={styles.heading1} style={{ marginTop: "30px" }}>Page Not Found</h1>
            <div className={styles.notFoundImage}>
                <img src={notFound} alt="" />
            </div>
        </div>
    );
}

export default NotFound;