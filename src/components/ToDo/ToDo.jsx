import React from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import styles from './todo.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const tasksWrapperRowCls = [
    "mt-5",
    "d-flex",
    "justify-content-center",
    styles.customTest
];
class ToDo extends React.Component {
    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
    }

    handleSubmit = (value) => {
        const tasks = [...this.state.tasks, value];
        // tasks.push(value);
        this.setState({
            tasks
        });

    }

    render() {
        const tasksJSX = this.state.tasks.map(function (task, index) {
            return (
                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <Task
                        task={task}
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

                <Row className={tasksWrapperRowCls.join(' ')}>
                    {tasksJSX}
                </Row>

            </Container>
        );
    }
};

export default ToDo;

