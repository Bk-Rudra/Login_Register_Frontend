import React, { Component } from "react";
import AuthService from "../Services/auth.service";
// import ReactDOM from "react-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }
  handleFileUpload = (event) => {
    console.log(event.target.files[0].name);
  };

  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <h2>Profile</h2>
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
        <p>
          <strong>Id: </strong>
          {currentUser.id}
        </p>
        <p>
          <strong>Email: </strong>
          {currentUser.email}
        </p>
        <input
          ref="fileInput"
          onChange={this.handleFileUpload}
          type="file"
          style={{ display: "none" }}
          // multiple={false}
        />
        <button onClick={() => this.refs.fileInput.click()}>Upload File</button>
      </React.Fragment>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<FileUploadButton />, rootElement);
