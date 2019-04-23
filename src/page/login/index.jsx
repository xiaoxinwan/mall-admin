import React from "react";
import "./index.scss";
import User from "service/user-service.jsx";
import LoginPage from "util/login-page.jsx";

const _user = new User();
const _loginPage = new LoginPage();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: _loginPage.getUrlParam("redirect") || "/"
    };
  }
  onInputChange(e) {
    let inputName = e.target.name,
      inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue
    });
  }
  onInputKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }
  onSubmit() {
    let loginInfo = {
        username: this.state.username,
        password: this.state.password
      },
      checkResult = _user.checkLoginInfo(loginInfo);
    if (checkResult.status) {
      _user.login(loginInfo).then(
        res => {
          this.props.history.push(this.state.redirect);
          // 从那里来跳回到那里
        },
        errMsg => {
          _loginPage.errorTips(errMsg);
        }
      );
    } else {
      _loginPage.errorTips(checkResult.msg);
    }
  }
  componentWillMount() {
    document.title = "登录 - MALL ADMIN";
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4 panel-login">
        <div className="panel panel-default ">
          <div className="panel-heading">欢迎登录 - MALL管理系统</div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">用户名</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={e => this.onInputChange(e)}
                  onKeyUp={e => this.onInputKeyUp(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">密码</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e => this.onInputChange(e)}
                  onKeyUp={e => this.onInputKeyUp(e)}
                />
              </div>
            </form>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={e => this.onSubmit(e)}
            >
              登录
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
