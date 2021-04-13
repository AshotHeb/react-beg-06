import React, { useEffect } from 'react';
import Task from '../../Task/Task';
import Confirm from '../../Confirm/Confirm';
import TaskModal from '../../TaskModal/TaskModal';
import Spinner from '../../Spinner/Spinner';
// import styles from './todo.module.css';
import types from '../../../Redux/actionTypes';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    SetTasksThunk,
    addTaskThunk,
    deletOneTaskThunk,
    removeCheckedTasks,
    handleEditTaskThunk
} from '../../../Redux/action';

const tasksWrapperRowCls = [
    "mt-5",
    "d-flex",
    "justify-content-center",
];
const ToDo = (props) => {


    const { setTasks, resetData } = props;
    useEffect(() => {
        setTasks();

        return function () {
            resetData();
        }
    }, [setTasks, resetData]);


    const {
        checkedTasks,
        tasks,
        isOpenAddTaskModal,
        isOpenConfirm,
        editableTask,
        loading,
        deleteTaskId,
        oneCheckedTask
    } = props;
    const tasksJSX = tasks.map(task => {
        return (
            <Col key={task._id} className="mt-3" xs={12} sm={6} md={4} lg={3}>
                <Task
                    task={task}
                    handleDeleteTask={props.deletOneTask}
                    handleToggleCheckTask={props.toggleCheckTask}
                    isAnyTaskChecked={!!checkedTasks.size}
                    isChecked={checkedTasks.has(task._id)}
                    setEditableTask={props.setEditTask}
                    isLoadingForDelete={deleteTaskId === task._id}
                />
            </Col>
        );

    });


    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <Button
                            onClick={props.toggleOpenAddTaskModal}
                            disabled={!!checkedTasks.size}
                        >
                            Add Task Modal
                            </Button>
                    </Col>
                </Row>

                <Row className={tasksWrapperRowCls.join(' ')}  >
                    {tasksJSX.length ? tasksJSX : loading ? "" : <p>There are no Tasks !</p>}
                </Row>

                <Row className="justify-content-center mt-5">
                    {
                        !!tasks.length && <>
                            <Button
                                variant="danger"
                                onClick={props.toggleConfirmModal}
                                disabled={!!!checkedTasks.size}
                            >
                                Delete All Cheked
                    </Button>
                            <Button
                                className="ml-5"
                                variant="primary"
                                onClick={props.toggleCheckAll}
                                disabled={!!!tasks.length}
                            >
                                {
                                    checkedTasks.size && tasks.length === checkedTasks.size ? "Remove Selected" : "Check All"
                                }
                            </Button>
                        </>
                    }
                </Row>
            </Container>

            {
                isOpenConfirm && <Confirm
                    onHide={props.toggleConfirmModal}
                    onSubmit={() => props.removeCheckedTasks(checkedTasks)}
                    countOrOneTaskTitle={oneCheckedTask ? oneCheckedTask.title : checkedTasks.size}
                />
            }

            {
                isOpenAddTaskModal && <TaskModal
                    onHide={props.toggleOpenAddTaskModal}
                    onSubmit={props.addTask}
                />
            }

            {
                editableTask && <TaskModal
                    onHide={props.setEditTask}
                    onSubmit={props.editTask}
                    editableTask={editableTask}
                />
            }
            {
                loading && <Spinner />
            }
        </>
    );

};

const mapStateToProps = (state) => {
    const {
        tasks,
        deleteTaskId,
        isOpenAddTaskModal,
        isOpenConfirm,
        checkedTasks,
        oneCheckedTask,
        editableTask
    } = state.todoState;
    return {
        tasks,
        deleteTaskId,
        isOpenAddTaskModal,
        isOpenConfirm,
        checkedTasks,
        oneCheckedTask,
        editableTask,
        loading: state.globalState.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        deletOneTask: (_id) => {
            dispatch((dispatch) => deletOneTaskThunk(dispatch, _id));
        },
        toggleOpenAddTaskModal: () => {
            dispatch({ type: types.TOGGLE_OPEN_ADD_TASK_MODAL });
        },
        addTask: (data) => {
            dispatch((dispatch) => addTaskThunk(dispatch, data))
        },
        toggleConfirmModal: () => {
            dispatch({ type: types.TOGGLE_CONFIRM_MODAL });
        },
        toggleCheckTask: (_id) => {
            dispatch({ type: types.TOGGLE_CHECK_TASK, _id });
        },
        removeCheckedTasks: (checkedTasks) => {
            dispatch((dispatch) => removeCheckedTasks(dispatch, checkedTasks));
        },
        setDeletTaskId: (_id) => {
            dispatch({ type: types.SET_DELETE_TASK_ID, _id });
        },
        toggleCheckAll: () => {
            dispatch({ type: types.TOGGLE_CHECK_ALL });

        },
        setTasks: () => {
            dispatch(SetTasksThunk);
        },
        setEditTask: (editTask) => dispatch({ type: types.SET_EDIT_TASK, editTask }),
        editTask: (editableTask) => {
            dispatch(handleEditTaskThunk(editableTask))
        },
        resetData: () => dispatch({ type: types.RESET_DATA })


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

