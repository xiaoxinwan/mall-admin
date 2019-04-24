import LoginPage from "util/login-page.jsx";

const _loginPage = new LoginPage();
class User {
  login(loginInfo) {
    return _loginPage.request({
      type: "post",
      url: "manage/user/login.do",
      data: loginInfo
    });
  }
  // 校验登录接口数据的合法性
  checkLoginInfo(loginInfo) {
    let username = $.trim(loginInfo.username),
      password = $.trim(loginInfo.password);
    if (typeof username !== "string" || username.length === 0) {
      return {
        status: false,
        msg: "用户名不能为空！"
      };
    }
    if (typeof password !== "string" || password.length === 0) {
      return {
        status: false,
        msg: "密码不能为空！"
      };
    }
    return { status: true, msg: "校验成功！" };
  }
  logout() {
    return _loginPage.request({
      type: "post",
      url: "user/logout.do"
    });
  }
  getUserList(pageNum,pageSize) {
    return _loginPage.request({
      type: "post",
      url: "/manage/user/list.do",
      data: {
        pageNum,pageSize
      }
    });
  }
}
export default User;
