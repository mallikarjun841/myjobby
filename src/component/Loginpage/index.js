import { Component } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import "./index.css";

class LoginPage extends Component {
  state = { username: "", password: "", error: "" };

  makecallpage = (data) => {
    const { history } = this.props;
    Cookies.set("jwt_token", data, { expires: 1, path: "/" });
    history.replace("/");
  };

  onsubmittingform = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const responsedata = await response.json();
    if (response.ok === true) {
      this.makecallpage(responsedata.jwt_token);
    } else {
      this.setState({ error: responsedata.error_msg });
    }
  };

  onchangeuseranme = (event) => {
    this.setState({ username: event.target.value });
  };

  onchangepassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { username, password, error } = this.state;
    const token = Cookies.get("jwt_token");
    console.log("make");
    console.log("done");

    if (token !== undefined) {
      return <Navigate to="/" replace />;
    }
    return (
      <div className="maincontainer">
        <div className="container">
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form onSubmit={this.onsubmittingform} className="formcontainer">
            <label className="name" htmlFor="username">
              Username
            </label>
            <input
              placeholder="Username"
              value={username}
              onChange={this.onchangeuseranme}
              className="inputname"
              type="text"
              id="username"
            />
            <label className="name" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={this.onchangepassword}
              className="inputpassword"
              type="password"
              id="password"
            />
            <button className="loginbutton" type="submit">
              Login
            </button>
          </form>
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }
}
export default LoginPage;
