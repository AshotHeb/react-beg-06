import React from 'react';
import B from './B';
import C from './C';

class A extends React.Component {
    state = {
        inputValue:''
    }
    handleSubmit = (value) =>{
        console.log('value' ,value);
    }
    render() {
        return (
            <div>
                <h1>A Component</h1>
                <B handleSubmit={this.handleSubmit}/>
                <C result={this.state.inputValue}/>
            </div>
        );
    }
}


export default A;