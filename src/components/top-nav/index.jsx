import React from "react";
import { Link } from "react-router-dom";
import LoginPage from "util/login-page.jsx";
import User from "service/user-service.jsx";

const _loginPage = new LoginPage();
const _user = new User();

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: _loginPage.getStorage("userInfo").username || ""
    };
  }

  onLogout() {
    _user.logout().then(
      res => {
        _loginPage.removeStorage("userInfo");
        window.location.href = "/login";
      },
      err => {
        _loginPage.errTips(err);
      }
    );
  }
  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <b>MALL</b>ADMIN
          </Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fa fa-user fa-fw" />
              {this.state.username ? (
                <span>欢迎，{this.state.username}</span>
              ) : (
                <span>欢迎你！</span>
              )}
              <i className="fa fa-caret-down" />
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a
                  onClick={() => {
                    this.onLogout();
                  }}
                >
                  <i className="fa fa-sign-out fa-fw">
                    <span>退出登录</span>
                  </i>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default TopNav;
