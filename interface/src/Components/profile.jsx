import React, { Component, useRef, useEffect,useState } from "react";
import { withRouter } from "react-router";
import AuthService from "../Services/auth.service";
import "./profile.css";
import WebViewer from "@pdftron/webviewer";
// import ReactDOM from "react-dom";
const Profile = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentUser: AuthService.getCurrentUser(),
  //   };
  // }
  const [currentUser] = useState(AuthService.getCurrentUser());

  const handleFileUpload = (event) => {
    console.log(event.target.files[0].name);
    console.log(event.target.files);
    console.log(event.target.value);
  };

  const logout = () => {
    AuthService.logout();
    this.props.history.push("/");
  };
  

  return (
    <div>
      <nav>
        <div className="navBar">Collab_Sign</div>
        <ul className="navLink">
          <ul>Hello,  </ul>
          <ul>
            
          </ul>
        </ul>
      </nav>
      <div style={{ paddingLeft: "50px" }}>
        <h2 style={{ textAlign: "center" }}>Profile</h2>
        <p>
          <strong>Id: </strong>
          
        </p>
        <p>
          <strong>Email: </strong>
          
        </p>
      </div>
      <input
        // ref="fileInput"
        onChange={handleFileUpload}
        type="file"
        style={{ display: "none" }}
        // multiple={false}
      />
     
    </div>
  );
};
export default withRouter(Profile);
