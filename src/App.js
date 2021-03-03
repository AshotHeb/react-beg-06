import './App.css';
import React from 'react';
// import ToDo from './components/ToDo/ToDo';
import LifeCycle from './Demo/LifeCycle';

class App extends React.Component {
  state = {
    test:false
  }
  handleTest =() =>{
    this.setState({
      test:!this.state.test
    });
  }
  render() {
    return (
      <div className="App">
        {/* <ToDo /> */}
        {this.state.test && <LifeCycle />} 
                <div>
          <button onClick={this.handleTest}>{this.state.test?'True':'False'}</button>
        </div> 
      </div>
    );
  }
}

export default App;
