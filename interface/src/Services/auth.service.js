import axios from "axios";
import React from "react";
const API_URL = "http://localhost:8080/api/auth/";

class AuthService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async login(username, password) {
    const response = await axios.post(API_URL + "signin", {
      username,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout = () => {
    localStorage.removeItem("user");
  };

  register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  };
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
