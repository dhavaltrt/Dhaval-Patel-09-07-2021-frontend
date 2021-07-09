import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth ? <Redirect to="/dashboard" /> : <Component {...props} />
    }
  />
);

class App extends Component {
  render() {
    const { user } = this.props;
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <AuthRoute
              exact
              path="/login"
              name="Login Page"
              auth={user.user}
              component={Login}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth,
  };
};

export default connect(mapStateToProps, {})(App);
