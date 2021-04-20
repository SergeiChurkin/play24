import "./App.css";
import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddEvent from "./components/Event/AddEvent";
import Landing from "./components/Layout/Landing";
import { Provider } from "react-redux";
import store from "./store";
import UpdateEvent from "./components/Event/UpdateEvent";
import ShowEvent from "./components/Event/ShowEvent";
import Login from "./components/UserManagment/Login";
import Register from "./components/UserManagment/Register";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecureRoute from "./securityUtils/SecureRoute";
import UserInfo from "./components/User/UserInfo";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Switch>
                <SecureRoute exact path="/dashboard/" component={Dashboard} />
                <SecureRoute exact path="/addEvent/" component={AddEvent} />
                <SecureRoute exact path="/userInfo/" component={UserInfo} />
                <SecureRoute
                  exact
                  path="/updateEvent/:id"
                  component={UpdateEvent}
                />
                <SecureRoute
                  exact
                  path="/showEvent/:id"
                  component={ShowEvent}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
