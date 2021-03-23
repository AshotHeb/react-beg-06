import React from 'react';
import Task from '../../Task/Task';
import Confirm from '../../Confirm/Confirm';
import TaskModal from '../../TaskModal/TaskModal';
import Spinner from '../../Spinner/Spinner';
// import styles from './todo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';


const API_HOST = "http://localhost:3001";
const tasksWrapperRowCls = [
    "mt-5",
    "d-flex",
    "justify-content-center",
];
class ToDo extends React.Component {
    state = {
        tasks: [],
        checkedTasks: new Set(),
        isOpenAddTaskModal: false,
        isOpenConfirm: false,
        editableTask: null,
        loading: false
    }
    toggleOpenConfirm = () => {
        this.setState({
            isOpenConfirm: !this.state.isOpenConfirm
        });
    }
    toggleOpenAddTaskModal = () => {
        this.setState({
            isOpenAddTaskModal: !this.state.isOpenAddTaskModal
        });
    }
    handleAddTask = (formData) => {
        this.setState({ loading: true });
        fetch(`${API_HOST}/task`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                //data.error
                if (data.error)
                    throw data.error;
                const tasks = [...this.state.tasks];
                tasks.push(data);
                this.setState({
                    tasks,
                    isOpenAddTaskModal:false
                });
            })
            .catch(error => {
                console.log("Add Task Error", error);
            })
            .finally(() => {
                this.setState({ loading: false });
            });


    }

    handleDeleteTask = (_id) => {
        // API_HOST/task/:taskId
        (async () => {
            try {
                const response = await fetch(`${API_HOST}/task/${_id}`, {
                    method: "DELETE"
                });
                const data = await response.json();

                if (data.error) throw data.error;

                let tasks = [...this.state.tasks];
                tasks = tasks.filter(task => task._id !== _id);
                this.setState({
                    tasks
                });
            } catch (error) {
                console.log("Delete One Task Request Error", error);
            }
        })();


    }
    handleToggleCheckTask = (_id) => {
        let checkedTasks = new Set(this.state.checkedTasks);
        if (!checkedTasks.has(_id)) {
            checkedTasks.add(_id);
        } else {
            checkedTasks.delete(_id);
        }
        this.setState({
            checkedTasks
        });
    }
    handleDeleteCheckedTasks = () => {
        const { checkedTasks } = this.state;
        fetch(`${API_HOST}/task`, {
            method: "PATCH",
            body: JSON.stringify({ tasks: Array.from(checkedTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                let tasks = [...this.state.tasks];
                tasks = tasks.filter(task => !checkedTasks.has(task._id));
                this.setState({
                    tasks,
                    checkedTasks: new Set()
                });
            })
            .catch(error => {
                console.log("Delete Batch of Tasks Error", error);
            });

    }
    toggleCheckAll = () => {
        const { tasks } = this.state;
        let checkedTasks = new Set(this.state.checkedTasks);
        if (tasks.length === checkedTasks.size) {
            checkedTasks.clear();
        } else {
            tasks.forEach(task => {
                checkedTasks.add(task._id);
            });
        }
        this.setState({
            checkedTasks
        });
    }
    getSingleTaskFromCheckedTasks = () => {
        if (this.state.checkedTasks.size !== 1)
            return;
        let id = null;
        this.state.checkedTasks.forEach(_id => {
            id = _id;
        });
        return this.state.tasks.find(task => task._id === id);

    }

    toggleSetEditableTask = (editableTask = null) => {
        this.setState({
            editableTask
        });
    }
    handleEditTask = (editableTask) => {

        (async () => {
            this.setState({ loading: true });
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
                this.setState({ loading: false });
            }

        })()





    }

    componentDidMount() {
        fetch(`${API_HOST}/task`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                this.setState({
                    tasks: data
                });
            })
            .catch(error => {
                console.log("Get All Tasks ", error);
            });
    }
    render() {

        const {
            checkedTasks,
            tasks,
            isOpenAddTaskModal,
            isOpenConfirm,
            editableTask,
            loading
        } = this.state;
        const tasksJSX = tasks.map(task => {
            return (
                <Col key={task._id} className="mt-3" xs={12} sm={6} md={4} lg={3}>
                    <Task
                        task={task}
                        handleDeleteTask={this.handleDeleteTask}
                        handleToggleCheckTask={this.handleToggleCheckTask}
                        isAnyTaskChecked={!!checkedTasks.size}
                        isChecked={checkedTasks.has(task._id)}
                        setEditableTask={this.toggleSetEditableTask}
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
                                onClick={this.toggleOpenAddTaskModal}
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
                                    onClick={this.toggleOpenConfirm}
                                    disabled={!!!checkedTasks.size}
                                >
                                    Delete All Cheked
                    </Button>
                                <Button
                                    className="ml-5"
                                    variant="primary"
                                    onClick={this.toggleCheckAll}
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
                        onHide={this.toggleOpenConfirm}
                        onSubmit={this.handleDeleteCheckedTasks}
                        countOrOneTaskTitle={checkedTasks.size > 1 ? checkedTasks.size : this.getSingleTaskFromCheckedTasks().title}
                    />
                }

                {
                    isOpenAddTaskModal && <TaskModal
                        onHide={this.toggleOpenAddTaskModal}
                        onSubmit={this.handleAddTask}
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

export default ToDo;

