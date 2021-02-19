import styles from './task.module.css';

const Task = (props) => {
    const { task, active } = props;
    //inline Styles
    // const styles = {
    //     padding: '15px 30px',
    //     backgroundColor: 'rgba(94, 15, 184,.5)',
    //     border: '1px solid black'
    // };
    // return (
    //     <div style={styles}>
    //         <p style={{color:'white'}}>{task}</p>
    //     </div>
    // );

    //    ?Dinamic Styles
    // return (
    //     <div className={`${styles.task} ${active ? styles.active : ''}`}>
    //         <p style={{ color: 'white' }}>{task}</p>
    //     </div>
    // );

    //Dinamic Styles with Array;
    const cls = [
        styles.task,
    ];
    if (active) {
        cls.push(styles.active);
    }
    return (
        <div className={cls.join(' ')}>
            <p style={{ color: 'white' }}>{task}</p>
        </div>
    );
};

export default Task;