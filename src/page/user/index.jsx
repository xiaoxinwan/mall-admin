import React from "react";
import PageTitle from "components/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import LoginPage from "util/login-page.jsx";
import User from "service/user-service.jsx";

const _user = new User();
const _loginPage = new LoginPage();

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      pageSize: 15,
      firstLoading: true
    };
  }
  componentDidMount() {
    this.loadUserList();
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum, this.state.pageSize).then(
      res => {
        this.setState(res, () => {
          this.setState({ firstLoading: false });
        });
      },
      errMsg => {
        this.setState({
          list: []
        });
        _loginPage.errorTips(errMsg);
      }
    );
  }
  onPageNumChange(pageNum) {
    this.setState({ pageNum }, () => {
      this.loadUserList();
    });
  }
  render() {
    let listBody = this.state.list.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{new Date(user.createTime).toLocaleString()}</td>
        </tr>
      );
    });
    let listError = (
      <tr>
        <td colSpan="5" className="text-center" style={{ padding: "20px" }}>
          {this.state.firstLoading ? "加载数据中......" : "没找到相应数据..."}
        </td>
      </tr>
      
    );
    let tableBody = this.state.list.length > 0 ? listBody : listError;
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表页" />
        <div className="row">
          <div className="col-md-12">
            <table className="table .table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>电话</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </table>
          </div>
        </div>
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
export default UserList;
