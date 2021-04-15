import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
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

const App = (props) => {
  const { errorMessage, successMessage } = props;

  useEffect(() => {
    errorMessage && toast.error(`🦄 ${errorMessage}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, [errorMessage]);

  useEffect(() => {
    successMessage && toast.success(`🦄 ${successMessage}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, [successMessage])


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

      <ToastContainer />

    </div>
  );

}
const mapStateToProps = (state) => ({
  errorMessage: state.globalState.errorMessage,
  successMessage: state.globalState.successMessage
});

export default connect(mapStateToProps, null)(App);
