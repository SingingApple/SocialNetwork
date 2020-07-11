import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import store from "./store";
import setAuthToken from "./util/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <React.Fragment>
        <Navbar></Navbar>
        <Route path="/" exact component={Landing}></Route>
        <section className="container">
          <Alert></Alert>
          <Switch>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/profiles" exact component={Profiles}></Route>
            <Route path="/profile/:id" exact component={Profile}></Route>
            <PrivateRoute path="/posts" exact component={Posts}></PrivateRoute>
            <PrivateRoute
              path="/posts/:id"
              exact
              component={Post}
            ></PrivateRoute>
            <PrivateRoute
              path="/dashboard"
              exact
              component={Dashboard}
            ></PrivateRoute>
            <PrivateRoute
              path="/create-profile"
              exact
              component={CreateProfile}
            ></PrivateRoute>
            <PrivateRoute
              path="/edit-profile"
              exact
              component={EditProfile}
            ></PrivateRoute>
            <PrivateRoute
              path="/add-experience"
              exact
              component={AddExperience}
            ></PrivateRoute>
            <PrivateRoute
              path="/add-education"
              exact
              component={AddEducation}
            ></PrivateRoute>
          </Switch>
        </section>
      </React.Fragment>
    </Router>
  );
};

export default App;
