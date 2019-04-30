import React from "react";
import PageTitle from "components/page-title/index.jsx";
import ListSearch from "./index-list-search.jsx";
import TableList from "util/table-list/index.jsx";
import Pagination from "util/pagination/index.jsx";
import Order from "service/order-service.jsx";
import { Link } from "react-router-dom";
import LoginPage from "util/login-page.jsx";

const _loginPage = new LoginPage();
const _order = new Order();

class OrderManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      pageSize: 15,
      listType: "list"
    };
  }
  componentDidMount() {
    this.loadOrderList();
  }
  loadOrderList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    listParam.pageSize = this.state.pageSize;
    if ((this.state.listType === "search")) {
      listParam.queryOrderNo = this.state.queryOrderNo;
    }
    _order.getOrderList(listParam).then(
      res => {
        this.setState(res);
      },
      errMsg => {
        this.setState({ list: [] });
        _loginPage.errorTips(errMsg);
      }
    );
  }
  onPageNumChange(pageNum) {
    this.setState({ pageNum }, () => {
      this.loadOrderList();
    });
  }
  onQuery(queryOrderNo) {
    let listType = queryOrderNo === "" ? "list" : "search";
    this.setState(
      {
        listType,
        queryOrderNo
      },
      () => {
        this.loadOrderList();
      }
    );
  }
  render() {
    let tableHeads = [
      { name: "订单号", width: "30%" },
      { name: "收件人", width: "10%" },
      { name: "订单状态", width: "10%" },
      { name: "订单总价", width: "15%" },
      { name: "创建时间", width: "25%" },
      { name: "操作", width: "10%" }
    ];
    return (
      <div id="page-wrapper">
        <PageTitle title="订单管理" />
        <ListSearch onQuery={queryOrderNo => this.onQuery(queryOrderNo)} />
        <TableList tableHeads={tableHeads}>
          {this.state.list.map((order, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link to={`/order/detail/${order.orderNo}`}>
                    {order.orderNo}
                  </Link>
                </td>
                <td>{order.receiverName}</td>
                <td>{order.statusDesc}</td>
                <td>¥{order.orderItemVoList[0].totalPrice}</td>
                <td>{order.createTime}</td>
                <td>
                  <Link to={`/order/detail/${order.orderNo}`}>
                    查看订单详情
                  </Link>
                </td>
              </tr>
            );
          })}
        </TableList>
        <Pagination
          total={this.state.total}
          pageSize={15}
          current={this.state.pageNum}
          onChange={pageNum => this.onPageNumChange(pageNum)}
        />
      </div>
    );
  }
}

export default OrderManage;
