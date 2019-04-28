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
    } else if (listParam.listType === "search") {
      url = "/manage/product/search.do";
      data.pageNum = listParam.pageNum;
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

  /*
   * 品类相关
   */
  getCategoryList(parentCategoryId) {
    return _loginPage.request({
      type: "post",
      url: "/manage/category/get_category.do",
      data: {
        categoryId: parentCategoryId || 0
      }
    });
  }
  // 获取商品详情
  getProduct(id) {
    return _loginPage.request({
      type: "post",
      url: "/manage/product/detail.do",
      data: {
        productId: id || 0
      }
    });
  }

  /**
   * 保存相关
   */
  checkProduct(product) {
    let result = {
      status: true,
      msg: "验证通过"
    };
    if (typeof product.name !== "string" || product.name.length === 0) {
      return {
        status: false,
        msg: "请输入正确的商品名称"
      };
    }
    if (typeof product.subTitle !== "string" || product.subTitle.length === 0) {
      return {
        status: false,
        msg: "请输入正确的商品描述"
      };
    }
    if (typeof product.categoryId !== "number" || !(product.categoryId > 0)) {
      return {
        status: false,
        msg: "请选择正确的商品品类"
      };
    }
    if (typeof product.price !== "number" || !(product.price > 0)) {
      return {
        status: false,
        msg: "请输入正确的商品价格"
      };
    }
    if (typeof product.stock !== "number" || !(product.stock > 0)) {
      return {
        status: false,
        msg: "请输入正确的库存"
      };
    }
    return result;
  }
  // 保存商品
  saveProduct(product) {
    return _loginPage.request({
      type: "post",
      url: "/manage/product/save.do",
      data: product
    });
  }
}

export default Product;
