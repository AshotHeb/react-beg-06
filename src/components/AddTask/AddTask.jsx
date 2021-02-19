import React, { Component } from 'react';
import styles from './addTask.module.css';

class AddTask extends Component {
    state = {
        inputValue: ''
    }
    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            inputValue: value
        });
    }
    //props.handleSubmit(newTask);
    handleS = () => {
        if(!this.state.inputValue) 
            return;
        this.props.handleSubmit(this.state.inputValue);
        this.setState({
            inputValue: ''
        });
    }

    render() {
        return (
            <div>
                <h1>AddTask Component</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Add Task"
                        onChange={this.handleChange}
                        value={this.state.inputValue}
                        className={styles.input}
                    />
                    <button
                        onClick={this.handleS}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
};

export default AddTask;