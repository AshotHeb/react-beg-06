import React from 'react';
import Task from '../Task/Task';
import Confirm from '../Confirm/Confirm';
import TaskModal from '../TaskModal/TaskModal';
// import styles from './todo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import idGenerator from '../../utils/idGenerator';

const tasksWrapperRowCls = [
    "mt-5",
    "d-flex",
    "justify-content-center",
];
class ToDo extends React.Component {
    state = {
        tasks: [
            {
                _id: idGenerator(),
                title: 'Task 1 ',
                description: "Task 1"
            },
            {
                _id: idGenerator(),
                title: 'Task 2 ',
                description: "Task 2"
            },
            {
                _id: idGenerator(),
                title: 'Task 3',
                description: "Task 3"
            },
        ],
        checkedTasks: new Set(),
        isOpenAddTaskModal: false,
        isOpenConfirm: false,
        editableTask: null
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
        const tasks = [...this.state.tasks];
        tasks.push({
            ...formData,
            _id: idGenerator()
        });
        this.setState({
            tasks
        });

    }

    handleDeleteTask = (_id) => {
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(task => task._id !== _id);

        this.setState({
            tasks
        });

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
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(task => !checkedTasks.has(task._id));
        this.setState({
            tasks,
            checkedTasks: new Set()
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
    // setEditableTask = (editableTask) => {
    //     this.setState({
    //         editableTask
    //     });
    // }
    // removeEditableTask = () => {
    //     this.setState({
    //         editableTask: null
    //     });
    // }
    toggleSetEditableTask = (editableTask = null) => {
        this.setState({
            editableTask
        });
    }
    handleEditTask = (editableTask) => {
        const tasks = [...this.state.tasks];
        const idx = tasks.findIndex(task => task._id === editableTask._id);
        tasks[idx] = editableTask;
        this.setState({
            tasks
        });

    }
    render() {
        const {
            checkedTasks,
            tasks,
            isOpenAddTaskModal,
            isOpenConfirm,
            editableTask,
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
            </>
        );
    }
};

export default ToDo;

