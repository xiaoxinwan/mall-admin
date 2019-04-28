import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ProductList from "page/product/index/index.jsx";
import ProductSave from "./index/save.jsx";
import ProductDetail from "./index/detail.jsx";
class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Route path="/product/save/:pid?" component={ProductSave} />
        <Route path="/product/detail/:pid" component={ProductDetail} />
        <Redirect exact from="/product" to="/product/index" />
      </Switch>
    );
  }
}

export default ProductRouter;
