import './App.css';
import React from 'react';
import ToDo from './components/ToDo/ToDo';

class App extends React.Component {
  state = {
    test: true
  }
  handleTest = () => {
    this.setState({
      test: !this.state.test
    });
  }
  render() {
    return (
      <div className="App">   
        <ToDo />
      </div>
    );
  }
}

export default App;
