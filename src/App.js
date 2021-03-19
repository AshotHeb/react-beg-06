import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//pages
import ToDo from './components/pages/ToDo/ToDo';
import Contact from './components/pages/Contact/Contact';
import About from './components/pages/About/About';
// import './JS/async';
import Navbar from './components/Navbar/Navbar';

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
        <Navbar />
        {/* Pages */}
        {/* Example 1 */}
        <Switch>
          <Route path="/" component={ToDo} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/about" component={About} exact />
          <Redirect to="/" />
        </Switch>



        {/* Example 2 */}

        {/* <Route path="/" render={()=> <ToDo test={this.state.test}/>} exact />
        <Route path="/contact" render={()=><Contact />} exact />
        <Route path="/about" render={()=> <About />} exact />  */}


        {/* Example 3 */}
        {/* <Route path="/" exact>
          <ToDo />
        </Route>

        <Route path="/contact" exact>
          <Contact />
        </Route>

        <Route path="/about" exact>
          <About />
        </Route> */}


      </div>
    );
  }
}

export default App;
