import LoginPage from "util/login-page.jsx";

const _loginPage = new LoginPage();

class Product {
  getProductList(listParam) {
    let url = "",
      data = {};
    if (listParam.listType === "list") {
      url = "/manage/product/list.do";
      data.pageNum = listParam.pageNum;
      data.pageSize = listParam.pageSize;
    }else if(listParam.listType === 'search') {
      url = '/manage/product/search.do';
      data.pageNum = listParam.pageNum
      data[listParam.searchType] = listParam.searchKeyword;
    }
    return _loginPage.request({
      type: "post",
      url,
      data
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
