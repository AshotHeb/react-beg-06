import React from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import styles from './todo.module.css';


class ToDo extends React.Component {
    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
        test: true,
        name: 'Ashot'
    }

    handleSubmit = (value) => {
        const tasks = [...this.state.tasks];
        tasks.push(value);
        // this.setState({
        //     tasks,
        // }, () => {
        //     this.setState({
        //         test:false
        //     },()=>{
        //         console.log('ENd');
        //     });
        //     // console.log('Tasks', this.state.tasks);
        //     // console.log('Test' , this.state.test);
        // });

        // this.setState({
        //     test: false
        // });

        this.setState(prevState => {
            return {
                tasks,
                name: prevState.name + ' Heboyan'
            };
        }, () => {
            console.log('State1', this.state);
        });

        // this.setState(prevState=>{
        //     return {
        //         name: prevState.name + ' Heboyan' + ' test'
        //     };
        // },()=>{
        //     console.log('state2' , this.state);
        // });

    }

    render() {
        const tasksJSX = this.state.tasks.map(function (task, index) {
            return <Task
                key={index}
                task={task}
                active={index === 1}
            />;
        });
        return (
            <div>
                <h1 className={styles.heading1}>ToDo Component</h1>
                <AddTask
                    handleSubmit={this.handleSubmit}
                />
                <div className="tasks_wrapper">
                    {tasksJSX}
                </div>
            </div>
        );
    }
};

export default ToDo;

