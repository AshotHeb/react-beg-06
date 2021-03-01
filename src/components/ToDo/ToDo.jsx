import React from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import styles from './todo.module.css';
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
                text: 'Task 1 '
            },
            {
                _id: idGenerator(),
                text: 'Task 2'
            },
            {
                _id: idGenerator(),
                text: 'Task 3'
            },
        ],
        checkedTasks: []//new Set()
    }

    handleSubmit = (value) => {
        const tasks = [...this.state.tasks];
        tasks.push({
            text: value,
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
    handleToggleCheckTask = (id) => {
        let checkedTasks = [...this.state.checkedTasks];   //  new Set(this.state.checkedTasks)
        if (!checkedTasks.includes(id)) {
            checkedTasks.push(id);
        } else {
            checkedTasks = checkedTasks.filter(taskId => taskId !== id);
        }
        this.setState({
            checkedTasks
        });
    }
    handleDeleteCheckedTasks = () => {

        const { checkedTasks } = this.state;
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(task => !checkedTasks.includes(task._id));
        this.setState({
            tasks,
            checkedTasks: []
        });

    }
    render() {
        const { checkedTasks, tasks } = this.state;
        const tasksJSX = tasks.map(task => {
            return (
                <Col key={task._id} className="mt-3" xs={12} sm={6} md={4} lg={3}>
                    <Task
                        task={task}
                        handleDeleteTask={this.handleDeleteTask}
                        handleToggleCheckTask={this.handleToggleCheckTask}
                        isAnyTaskChecked={!!checkedTasks.length}
                        isChecked={checkedTasks.includes(task._id)}
                    />
                </Col>
            );

        });


        return (
            <Container>
                <Row>
                    <Col>
                        <h1 className={styles.heading1}>ToDo Component</h1>
                        <AddTask
                            handleSubmit={this.handleSubmit}
                            isAnyTaskChecked={!!checkedTasks.length}
                        />
                    </Col>
                </Row>

                <Row className={tasksWrapperRowCls.join(' ')}  >
                    {tasksJSX.length ? tasksJSX : <p>There are no Tasks !</p>}
                </Row>

                <Row className="justify-content-center mt-5">
                    <Button
                        variant="danger"
                        onClick={this.handleDeleteCheckedTasks}
                        disabled={!!!checkedTasks.length}
                    >
                        Delete All Cheked
                    </Button>
                </Row>
            </Container>
        );
    }
};

export default ToDo;

