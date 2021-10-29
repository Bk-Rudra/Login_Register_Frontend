import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/App.css";
import Register from "./register";
import Login from "./login";
import RightSide from "./rightSide";
import { withRouter } from "react-router";

const LoginContainer = () => {
  const [isLogginActive, setLoginActive] = useState(true);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <div className="login">
        <div className="container">
          {isLogginActive ? <Login /> : <Register />}
        </div>
        <RightSide
          isLogginActive={isLogginActive}
          onClick={() => setLoginActive(!isLogginActive)}
        />
      </div>
    </div>
  );
};
export default withRouter(LoginContainer);
