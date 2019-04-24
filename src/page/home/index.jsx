import React from "react";
import PageTitle from "components/page-title/index.jsx";
import "./index.scss";
import { Link } from "react-router-dom";
import LoginPage from "util/login-page.jsx";
import HomePage from "service/home-page-service.jsx";

const _loginPage = new LoginPage()
const _homePage = new HomePage()

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: "5555",
      productCount: "6666",
      orderCount: "7777"
    };
  }
  componentDidMount() {
    this.loadCount();    
  }
  loadCount() {
    _homePage.getHomeCount().then(
      res => {
        this.setState(res);
      },
      errMsg => {
        _loginPage.errorTips(errMsg);
      }
    );
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="首页" />
        <div className="row">
          <div className="col-md-4">
            <Link to="/user" className="color-box blue">
              <p className="count">{this.state.userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o" />
                <span>用户数量</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/product" className="color-box brown">
              <p className="count">{this.state.productCount}</p>
              <p className="desc">
                <i className="fa fa-list" />
                <span>商品数量</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/order" className="color-box green">
              <p className="count">{this.state.orderCount}</p>
              <p className="desc">
                <i className="fa fa-check-square-o" />
                <span>用户数量</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
