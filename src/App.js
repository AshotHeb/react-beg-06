import './App.css';
import React from 'react';
import ToDo from './components/ToDo/ToDo';
// import './JS/async';

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
