import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";

const App = props => {
  const auth = new Auth(props.history);
  return (
    <>
      <Nav auth={auth} />
      <div className="body">
        <Route
          path="/"
          exact
          render={props => <Home auth={auth} {...props} />}
        />
        <Route
          path="/profile"
          render={props =>
            auth.isAuthenticated() ? (
              <Profile auth={auth} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route path="/public" component={Public} />
        <Route
          path="/private"
          render={props =>
            auth.isAuthenticated() ? (
              <Private auth={auth} {...props} />
            ) : (
              auth.login()
            )
          }
        />
        <Route
          path="/courses"
          render={props =>
            auth.isAuthenticated() && auth.userHasScopes(["read:courses"]) ? (
              <Courses auth={auth} {...props} />
            ) : (
              auth.login()
            )
          }
        />
        <Route
          path="/callback"
          render={props => <Callback auth={auth} {...props} />}
        />
      </div>
    </>
  );
};

export default App;
