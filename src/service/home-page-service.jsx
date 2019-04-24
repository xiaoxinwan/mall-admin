import LoginPage from "util/login-page.jsx";
const _loginPage = new LoginPage();

class HomePage {
  getHomeCount() {
    return _loginPage.request({
      url: "/manage/statistic/base_count.do"
    });
  }
}
export default HomePage;
