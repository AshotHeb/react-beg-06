import React from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import styles from './todo.module.css';
import { Container, Row, Col } from 'react-bootstrap';
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
        //example 1
        // const idx = tasks.findIndex(task => task._id === _id);
        // tasks.splice(idx, 1);

        //example 2 
        tasks = tasks.filter(task => task._id !== _id);
        
        this.setState({
            tasks
        });

    }
    render() {
        const tasksJSX = this.state.tasks.map(task => {
            return (
                <Col key={task._id} className="mt-3" xs={12} sm={6} md={4} lg={3}>
                    <Task
                        task={task}
                        handleDeleteTask={this.handleDeleteTask}
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
                        />
                    </Col>
                </Row>

                <Row className={tasksWrapperRowCls.join(' ')}  >
                    {tasksJSX.length ? tasksJSX : <p>There are no Tasks !</p>}
                </Row>

            </Container>
        );
    }
};

export default ToDo;

