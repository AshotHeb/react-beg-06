import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//pages
import ToDo from './components/pages/ToDo/ToDo';
import Contact from './components/pages/Contact/Contact';
import About from './components/pages/About/About';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
// import './JS/async';
import Navbar from './components/Navbar/Navbar';

const pages = [
  {
    path: "/",
    component: ToDo,
    exact: true
  },
  {
    path: "/contact",
    component: Contact,
    exact: true
  },
  {
    path: "/about",
    component: About,
    exact: true
  },
  {
    path: "/task/:id",
    component: SingleTask,
    exact: true
  },
  {
    path: "/404",
    component: NotFound,
    exact: true
  }
];

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
    const pagesJSX = pages.map((page, index) => {
      return (
        <Route
          key={index}
          path={page.path}
          component={page.component}
          exact={page.exact}
        />
      );
    });
    return (
      <div className="App">
        <Navbar />

        <Switch>
          {pagesJSX}
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}

export default App;
