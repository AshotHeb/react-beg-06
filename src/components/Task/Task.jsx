import styles from './task.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from 'react-bootstrap';

const Task = ({ task, handleDeleteTask }) => {

    // const handleDelete = (e) => {
    //     handleDeleteTask(task._id);
    // }
    
    return (
        <Card className={styles.task}>
            <Card.Body>
                <Card.Title style={{ color: 'white' }}>{task.text}</Card.Title>
                <Button
                    variant="danger"
                    onClick={(e) => handleDeleteTask(task._id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button variant="warning" className="ml-3">
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </Card.Body>
        </Card>

    );
};

export default Task;