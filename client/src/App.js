import React, { useEffect, Fragment } from "react";
import "./App.css";
import Navbar from "./component/layouts/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./component/layouts/Alert";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import EditProject from "./component/projects/EditProject";
import ProjectList from "./component/projects/ProjectList";
import PrivateRoute from "./component/routing/PrivateRoute";
import AllUserProjects from "./component/projects/AllUserProjects";
// Redux
import { Provider } from "react-redux";
import store from "./Store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import CreateProject from "./component/projects/CreateProject";
import {
  explore,
} from "./actions/project";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect( () => {
    store.dispatch(loadUser());
    store.dispatch(explore());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={AllUserProjects} />
            <PrivateRoute exact path="/dashboard" component={ProjectList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/new-project" component={CreateProject} />
            <PrivateRoute path="/edit-project/:id" component={EditProject} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
