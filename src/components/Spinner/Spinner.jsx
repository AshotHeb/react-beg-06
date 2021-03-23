import styles from './spinner.module.css';
import SpinnerIcon from '../../assets/images/spinner.gif';
const Spinner = () => {
    return (
        <div className={styles.spinner_wrapper}>
            {/* <img src={SpinnerIcon} alt="Spinner" /> */}
            <div className={styles.loader}>Loading...</div>
        </div>
    )
}
export default Spinner;