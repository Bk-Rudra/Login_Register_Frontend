import React, { Component, useRef, useEffect } from "react";
import { withRouter } from "react-router";
import AuthService from "../Services/auth.service";
import "./profile.css";
import WebViewer from "@pdftron/webviewer";
// import ReactDOM from "react-dom";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  handleFileUpload = (event) => {
    console.log(event.target.files[0].name);
    console.log(event.target.files);
    console.log(event.target.value);
  };

  logout = () => {
    AuthService.logout();
    this.props.history.push("/");
  };

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav>
          <div className="navBar">Collab_Sign</div>
          <ul className="navLink">
            <ul>Hello, {currentUser.username} </ul>
            <ul>
              <a onClick={this.logout}>Logout</a>
            </ul>
          </ul>
        </nav>
        <div style={{ paddingLeft: "50px" }}>
          <h2 style={{ textAlign: "center" }}>Profile</h2>
          <p>
            <strong>Id: </strong>
            {currentUser.id}
          </p>
          <p>
            <strong>Email: </strong>
            {currentUser.email}
          </p>
        </div>
        <input
          ref="fileInput"
          onChange={this.handleFileUpload}
          type="file"
          style={{ display: "none" }}
          // multiple={false}
        />
        <a className="button" onClick={() => this.refs.fileInput.click()}>
          Upload File
        </a>
      </div>
    );
  }
}
export default withRouter(Profile);
