import LoginPage from "util/login-page.jsx";

const _loginPage = new LoginPage();

class Product {
  getProductList(pageNum, pageSize) {
    return _loginPage.request({
      type: "post",
      url: "/manage/product/list.do",
      data: { pageNum, pageSize }
    });
  }
  setProductStatus(productInfo) {
    return _loginPage.request({
      type: "post",
      url: "/manage/product/set_sale_status.do",
      data: productInfo
    });
  }
}

export default Product;
