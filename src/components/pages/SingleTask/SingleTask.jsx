import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './singleTask.module.css'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import TaskModal from '../../TaskModal/TaskModal';
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import {
    setSingleTaskThunk,
    deletOneTaskThunk,
    handleEditTaskThunk,
    toggleSingleTaskModal,
    resetSingleTaskState
} from '../../../Redux/action';



const SingleTask = (props) => {


    const { history, setSingleTaskThunk, resetSingleTaskState } = props;
    const { id } = props.match.params;

    useEffect(() => {
        setSingleTaskThunk(id, history);
        return function () {
            resetSingleTaskState()
        }
    }, [id, history, setSingleTaskThunk, resetSingleTaskState]);

    const {
        singleTask,
        loading,
        isEditModal
    } = props;







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
                            onClick={() => props.deletOneTaskThunk(singleTask._id, history)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button
                            variant="warning"
                            className="ml-3"
                            onClick={props.toggleSingleTaskModal}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </div>
                </div>

            </div>
            {
                isEditModal && <TaskModal
                    onHide={props.toggleSingleTaskModal}
                    onSubmit={(editableTask) => props.handleEditTaskThunk(editableTask, "singleTask")}
                    editableTask={singleTask}
                />
            }
            {
                loading && <Spinner />
            }
        </>
    );

}
const mapStateToProps = (state) => {
    const {
        singleTask,
        isEditModal
    } = state.sinlgeTaskState
    return {
        singleTask,
        isEditModal,
        loading: state.globalState.loading
    }
};

const mapDispatchToProps = {
    setSingleTaskThunk,
    deletOneTaskThunk,
    handleEditTaskThunk,
    toggleSingleTaskModal,
    resetSingleTaskState
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);