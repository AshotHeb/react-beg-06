import styles from './task.module.css';

const Task = (props) => {
    const { task, active } = props;
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