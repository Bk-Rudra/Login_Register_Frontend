import React from "react";
import loginImage from "./loginImage.jpg";
import { isEmail } from "validator";
import AuthService from "../Services/auth.service";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

const required = (value) => {
  if (!value) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "12px", height: "10px" }}
      >
        * duhhh...This is mandatory human !
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "12px", height: "10px" }}
      >
        * Oops email is not valid...!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length <= 4 || value.length > 20) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "12px", height: "10px" }}
      >
        * Username must be of 4 to 20 character.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length <= 5 || value.length > 60) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "12px", height: "10px" }}
      >
        * Password must be of 6 to 60 character.
      </div>
    );
  }
};

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: true,
    });

    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <br />
        <div className="content">
          <div className="image">
            <img src={loginImage} alt="" />
          </div>
          <Form
            onSubmit={(e) => this.handleRegister(e)}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div className="form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    name="email"
                    placeholder="your@email.com"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
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
                    validations={[required, vpassword]}
                  />
                </div>
              </div>
            )}
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-sucess"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <div className="footer">
              <button type="submit" className="btn">
                Register
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
