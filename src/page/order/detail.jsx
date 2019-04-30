import React from "react";
import PageTitle from "components/page-title/index.jsx";
import TableList from "util/table-list/index.jsx";
import Order from "service/order-service.jsx";
import LoginPage from "util/login-page.jsx";

import "./detail.scss";
const _order = new Order();
const _loginPage = new LoginPage();

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: this.props.match.params.orderNo,
      orderItemVoList: []
    };
  }
  componentDidMount() {
    this.loadOrderList();
  }
  loadOrderList() {
    _order.getOrderDetail(this.state.orderNo).then(
      res => {
        this.setState(res);
      },
      errMsg => {
        this.setState({ orderList: [] });
        _loginPage.errorTips(errMsg);
      }
    );
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="订单详情" />
        <div className="row">
          <div className="col-md-12" />
        </div>
        <TableList
          tableHeads={["商品图片", "商品信息", "单价", "数量", "合计"]}
        >
          {this.state.orderItemVoList.map((order, index) => {
            return (
              <tr key={index}>
                <td>
                  <img
                    className="productImg"
                    src={this.state.imageHost + order.productImage}
                  />
                </td>
                <td>{order.productName}</td>
                <td>{order.currentUnitPrice}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
              </tr>
            );
          })}
        </TableList>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p type="text" className="form-control-static">
                {this.state.orderNo}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.createTime}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.receiverName}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.statusDesc}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.paymentTypeDesc}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.payment}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderDetail;
