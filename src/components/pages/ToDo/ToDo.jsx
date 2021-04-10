import React from 'react';
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
    removeCheckedTasks
} from '../../../Redux/action';

const API_HOST = "http://localhost:3001";
const tasksWrapperRowCls = [
    "mt-5",
    "d-flex",
    "justify-content-center",
];
class ToDo extends React.Component {



    toggleSetEditableTask = (editableTask = null) => {
        this.setState({
            editableTask
        });
    }
    handleEditTask = (editableTask) => {
        this.setState({ loading: true });         //Loading Started
        (async () => {
            try {
                const { _id } = editableTask;
                const response = await fetch(`${API_HOST}/task/${_id}`, {
                    method: "PUT",
                    body: JSON.stringify(editableTask),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (data.error) throw data.error;
                const tasks = [...this.state.tasks];
                const idx = tasks.findIndex(task => task._id === data._id);
                tasks[idx] = data;
                this.setState({
                    tasks,
                    editableTask: null
                });
            } catch (error) {
                console.log("Edit Task Request Error", error);
            }
            finally {
                this.setState({ loading: false });  //Loading Ended
            }

        })()



    }

    componentDidMount() {
        this.props.setTasks();
    }
    render() {

        const {
            checkedTasks,
            tasks,
            isOpenAddTaskModal,
            isOpenConfirm,
            editableTask,
            loading,
            deleteTaskId,
            oneCheckedTask
        } = this.props;
        const tasksJSX = tasks.map(task => {
            return (
                <Col key={task._id} className="mt-3" xs={12} sm={6} md={4} lg={3}>
                    <Task
                        task={task}
                        handleDeleteTask={this.props.deletOneTask}
                        handleToggleCheckTask={this.props.toggleCheckTask}
                        isAnyTaskChecked={!!checkedTasks.size}
                        isChecked={checkedTasks.has(task._id)}
                        setEditableTask={this.toggleSetEditableTask}
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
                                onClick={this.props.toggleOpenAddTaskModal}
                                disabled={!!checkedTasks.size}
                            >
                                Add Task Modal
                            </Button>
                        </Col>
                    </Row>

                    <Row className={tasksWrapperRowCls.join(' ')}  >
                        {tasksJSX.length ? tasksJSX : <p>There are no Tasks !</p>}
                    </Row>

                    <Row className="justify-content-center mt-5">
                        {
                            !!tasks.length && <>
                                <Button
                                    variant="danger"
                                    onClick={this.props.toggleConfirmModal}
                                    disabled={!!!checkedTasks.size}
                                >
                                    Delete All Cheked
                    </Button>
                                <Button
                                    className="ml-5"
                                    variant="primary"
                                    onClick={this.props.toggleCheckAll}
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
                        onHide={this.props.toggleConfirmModal}
                        onSubmit={() => this.props.removeCheckedTasks(checkedTasks)}
                        countOrOneTaskTitle={oneCheckedTask ? oneCheckedTask.title : checkedTasks.size}
                    />
                }

                {
                    isOpenAddTaskModal && <TaskModal
                        onHide={this.props.toggleOpenAddTaskModal}
                        onSubmit={this.props.addTask}
                    />
                }

                {
                    editableTask && <TaskModal
                        onHide={this.toggleSetEditableTask}
                        onSubmit={this.handleEditTask}
                        editableTask={editableTask}
                    />
                }
                {
                    loading && <Spinner />
                }
            </>
        );
    }
};

const mapStateToProps = (state) => {
    const {
        tasks,
        deleteTaskId,
        isOpenAddTaskModal,
        isOpenConfirm,
        checkedTasks,
        oneCheckedTask
    } = state.todoState;
    return {
        tasks,
        deleteTaskId,
        isOpenAddTaskModal,
        isOpenConfirm,
        checkedTasks,
        oneCheckedTask,
        loading: state.loading
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
            dispatch({ type: "SET_DELETE_TASK_ID", _id });

        },
        toggleCheckAll: () => {
            dispatch({ type: types.TOGGLE_CHECK_ALL });

        },
        setTasks: () => {
            dispatch(SetTasksThunk)
        }



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

