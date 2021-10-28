import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import AuthService from "../Services/auth.service";
import { withRouter } from "react-router";

const onLogout = () => {
  AuthService.logout();
  return <div></div>;
};
export default onLogout;
