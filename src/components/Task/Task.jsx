import styles from './task.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from 'react-bootstrap';
import withScreenSizes from '../../hoc/withScreenSizes';
import { memo } from 'react';
const Task = ({
    task,
    handleDeleteTask,
    handleToggleCheckTask,
    isAnyTaskChecked,
    isChecked,
    ...props
}) => {
    const cls = [styles.task];
    if (isChecked)
        cls.push(styles.checked);
    console.log("Task Props", props);
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

export default withScreenSizes(memo(Task));