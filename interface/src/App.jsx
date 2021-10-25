import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import Profile from "./Components/profile";
import AuthService from "./Services/auth.service";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/style.css";
import LoginContainer from "./Components/loginContainer";
import { withRouter } from "react-router";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDashboard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    setTimeout(() => {user && this.props.history.push("/profile")}, 0);
  }

  logout = () => {
    AuthService.logout();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" >
          <LoginContainer />
        </Route>
        <Route exact path="/profile" component={Profile} />
      </Switch>
    );
  }
}

export default withRouter(App);


