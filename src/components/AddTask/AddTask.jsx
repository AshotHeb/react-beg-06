import React, { Component } from 'react';
import styles from './addTask.module.css';
import { Form, Button, InputGroup } from 'react-bootstrap';

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
    // handlePress = (event) => {
    //     const { key } = event;
    //     if (key !== 'Enter')
    //         return;
    //     this.props.handleSubmit(this.state.inputValue);
    //     this.setState({
    //         inputValue: ''
    //     });
    // }
    handleS = ({ key, type }) => {
        if (!this.state.inputValue ||
            (type === 'keypress' && key !== 'Enter')
        )
            return;



        this.props.handleSubmit(this.state.inputValue);
        this.setState({
            inputValue: ''
        });
    }

    render() {
        return (
            <div>
                <InputGroup className="mb-5 mt-5">
                    <Form.Control
                        type="text"
                        placeholder="Add Task"
                        onChange={this.handleChange}
                        onKeyPress={this.handleS}
                        value={this.state.inputValue}
                        className={styles.input}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="primary"
                            onClick={this.handleS}
                            className="ml-3"
                        >
                            Add
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
};

export default AddTask;