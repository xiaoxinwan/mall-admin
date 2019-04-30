import LoginPage from "util/login-page.jsx";

const _loginPage = new LoginPage();

class Order {
  getOrderList(listParam) {
    let url = "",
      data = {};
    if (listParam.listType === "list") {
      url = "/manage/order/list.do";
      data.pageNum = listParam.pageNum;
      data.pageSize = listParam.pageSize;
    } else if (listParam.listType === "search") {
      url = "/manage/order/search.do";
      data.pageNum = listParam.pageNum;
      data.orderNo = listParam.queryOrderNo;
    }
    return _loginPage.request({
      type: "post",
      url,
      data
    });
  }

  getOrderDetail(orderNo) {
    return _loginPage.request({
      type: "post",
      url: "/manage/order/detail.do",
      data: { orderNo }
    });
  }
}

export default Order;
