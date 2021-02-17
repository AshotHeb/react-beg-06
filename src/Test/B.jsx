import React from 'react';

class B extends React.Component {
    state = {
        inputValue: ""
    }
    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            inputValue: value
        });
    }
    // handleSubmit = () => {
    //     const tasks = [...this.state.tasks];
    //     tasks.push(this.state.inputValue);
    //     this.setState({
    //         tasks,
    //         inputValue: ""
    //     });

    // }
    handleSub = () =>{
        const { handleSubmit } = this.props;
        handleSubmit(this.state.inputValue);
    }
    render() {
        
        
        return (
            <div>
                <h1>B Component</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Add Task"
                        onChange={this.handleChange}
                        value={this.state.inputValue}
                    />
                    <button
                        onClick={this.handleSub}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

export default B;