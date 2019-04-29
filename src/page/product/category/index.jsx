import React from "react";
import { Link } from "react-router-dom";
import LoginPage from "util/login-page.jsx";
import PageTitle from "components/page-title/index.jsx";
import TableList from "util/table-list/index.jsx";
import Product from "service/product-service.jsx";

import "./index.scss";

const _loginPage = new LoginPage();
const _product = new Product();

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0
    };
  }
  componentDidMount() {
    this.loadCategoryList();
  }
  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname,
      newPath = this.props.location.pathname,
      newId = this.props.match.params.categoryId;
    if (oldPath !== newPath) {
      this.setState(
        {
          parentCategoryId: newId
        },
        () => {
          this.loadCategoryList();
        }
      );
    }
  }
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(
      res => {
        this.setState({
          list: res
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
  // 更新品类名称
  onUpdateName(categoryId, categoryName) {
    let newName = window.prompt("请输入新的品类名称", categoryName);
    if (newName) {
      _product
        .updateCategoryName({
          categoryId,
          categoryName: newName
        })
        .then(
          res => {
            _loginPage.successTips(res);
            this.loadCategoryList();
          },
          errMsg => {
            _loginPage.errorTips(errMsg);
          }
        );
    }
  }
  render() {
    let listBody = this.state.list.map((category, index) => {
      return (
        <tr key={index}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
            <a
              className="operate"
              onClick={e => this.onUpdateName(category.id, category.name)}
            >
              修改名称
            </a>
            {category.parentId === 0 ? (
              <Link to={`/product-category/index/${category.id}`}>
                查看子品类
              </Link>
            ) : null}
          </td>
        </tr>
      );
    });
    return (
      <div id="page-wrapper">
        <PageTitle title="品类管理页">
          <div className="page-header-right">
            <Link to="/product-category/add" className="btn btn-primary">
              <i className="fa fa-plus" />
              <span>添加品类</span>
            </Link>
          </div>
        </PageTitle>
        <div className="col-md-12">
          <p className="category-id">
            当前商品分类ID为 {this.state.parentCategoryId}
          </p>
        </div>
        <TableList tableHeads={["品类ID", "品类名称", "操作"]}>
          {listBody}
        </TableList>
      </div>
    );
  }
}

export default CategoryList;
