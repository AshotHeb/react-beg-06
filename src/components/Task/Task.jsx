import styles from './task.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from 'react-bootstrap';

const Task = ({
    task,
    handleDeleteTask,
    handleToggleCheckTask,
    isAnyTaskChecked,
    isChecked
}) => {
    const cls = [styles.task];
    if (isChecked)
        cls.push(styles.checked);

    return (
        <Card className={cls.join(' ')}>
            <input
                type="checkbox"
                onChange={() => handleToggleCheckTask(task._id)}
                checked={isChecked}
            />
            <Card.Body>
                <Card.Title style={{ color: 'white' }}>{task.text}</Card.Title>
                <Button
                    variant="danger"
                    onClick={() => handleDeleteTask(task._id)}
                    disabled={isAnyTaskChecked}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                    variant="warning"
                    className="ml-3"
                    disabled={isAnyTaskChecked}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Task;