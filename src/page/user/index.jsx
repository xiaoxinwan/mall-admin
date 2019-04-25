import React from "react";
import PageTitle from "components/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import LoginPage from "util/login-page.jsx";
import User from "service/user-service.jsx";
import TableList from "util/table-list/index.jsx";
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
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表页" />
        <TableList
          tableHeads={["ID", "用户名", "邮箱", "手机", "注册时间"]}
        >
          {this.state.list.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.createTime).toLocaleString()}</td>
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
export default UserList;
