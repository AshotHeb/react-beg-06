import styles from './task.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

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

    return (
        <Card className={cls.join(' ')}>
            <input
                type="checkbox"
                onChange={() => handleToggleCheckTask(task._id)}
                checked={isChecked}
            />
            <Card.Body>
                <Card.Title style={{ color: 'white' }}>Title : {task.title}</Card.Title>
                <Card.Text style={{ color: 'white' ,marginBottom:"30px"}}>Description :{task.description}</Card.Text>
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

Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    handleDeleteTask: PropTypes.func.isRequired,
    handleToggleCheckTask: PropTypes.func.isRequired,
    isAnyTaskChecked: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired

}
export default memo(Task);