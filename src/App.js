import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//pages
import ToDo from './components/pages/ToDo/ToDo';
import Contact from './components/pages/Contact/Contact';
import About from './components/pages/About/About';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
import Navbar from './components/Navbar/Navbar';

//context
import SingleTaskProvider from './context/providers/SingleTaskProvider';

//Components
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
    path: "/error/:status",
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
      if (page.path === "/task/:id") {
        return <Route
          key={index}
          path={page.path}
          render={(props) => (
            <SingleTaskProvider {...props}>
              <page.component {...props} />
            </SingleTaskProvider>
          )}
          exact={page.exact}
        />
      }
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
          <Redirect to="/error/404" />
        </Switch>
        {/* <Hooks /> */}

      </div>
    );
  }
}

export default App;
