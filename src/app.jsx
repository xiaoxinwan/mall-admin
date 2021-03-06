import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Layout from "components/layout/index.jsx";
import Home from "page/home/index.jsx";
import Login from "page/login/index.jsx";
import Error from "page/error/index.jsx";
import UserList from "page/user/index.jsx";
import ProductRouter from "page/product/router.jsx";
import OrderManage from "page/order/index.jsx";
import OrderDetail from "page/order/detail.jsx";

class App extends React.Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product" component={ProductRouter} />
          <Route path="/product-category" component={ProductRouter} />
          <Route path="/order/index" component={OrderManage} />
          <Redirect exact from="/order" to="/order/index" />
          <Route path="/order/detail/:orderNo" component={OrderDetail} />
          <Route path="/user/index" component={UserList} />
          <Redirect exact from="/user" to="/user/index" />
          <Route component={Error} />
        </Switch>
      </Layout>
    );

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={props => LayoutRouter} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
