import React, { useContext, useEffect } from 'react';
import styles from './singleTask.module.css'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import TaskModal from '../../TaskModal/TaskModal';
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import { singleTaskContext } from '../../../context/context';

const API_HOST = "http://localhost:3001";

const SingleTask = () => {
    const {
        singleTask,
        isEditModal,
        loading,

        //functions
        handleEditTask,
        toggleEditModal,
        getTask,
        handleDeleteTask

    }
        = useContext(singleTaskContext);

    useEffect(() => {
        getTask();
    },[getTask]);





    if (!singleTask || loading) return <Spinner />
    return (
        <>
            <div>
                <h1>SingleTask</h1>
                <div className={styles.singleTaskSection}>
                    <p>
                        Title : {singleTask.title}
                    </p>
                    <p>
                        Description : {singleTask.description}
                    </p>
                    <div>
                        <Link to="/">Home</Link>
                        <Button
                            variant="danger"
                        onClick={handleDeleteTask}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button
                            variant="warning"
                            className="ml-3"
                            onClick={() => toggleEditModal(true)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </div>
                </div>

            </div>
            {
                isEditModal && <TaskModal
                    onHide={() => toggleEditModal(false)}
                    onSubmit={handleEditTask}
                    editableTask={singleTask}
                />
            }
            {
                loading && <Spinner />
            }
        </>
    );

}

export default SingleTask;