import styles from './spinner.module.css';
const Spinner = () => {
    return (
        <div className={styles.spinner_wrapper}>
            <div className={styles.loader}>Loading...</div>
        </div>
    )
}
export default Spinner;