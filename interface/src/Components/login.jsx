import React from "react";
import AuthService from "../Services/auth.service";
import loginImage from "./loginImage.jpg";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import { withRouter } from "react-router";

const required = (value) => {
  if (!value) {
    return (
      <div
        className="alert alert-danger"
        style={{ fontSize: "12px", height: "10px" }}
      >
        * This field is required...!!
      </div>
    );
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    let { history } = this.props;

    this.setState({
      message: "logged in sucessfully",
      loading: true,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          history.push("/profile"); 
          // <Redirect to="/profile" />
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <br />
        <div className="content">
          <div className="image">
            <img src={loginImage} />
          </div>
          <Form
            onSubmit={(e) => {
              this.handleLogin(e);
            }}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>
            </div>
            <div className="footer">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
