import React from "react";
import LoginPage from "util/login-page.jsx";
import PageTitle from "components/page-title/index.jsx";
import Product from "service/product-service.jsx";

const _loginPage = new LoginPage();
const _product = new Product();

class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      parentId: 0,
      categoryName: ""
    };
  }
  componentDidMount() {
    this.loadCategoryList();
  }

  loadCategoryList() {
    _product.getCategoryList().then(
      res => {
        this.setState({
          categoryList: res
        });
      },
      errMsg => {
        _loginPage.errorTips(errMsg);
      }
    );
  }
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  onSubmit() {
    let categoryName = this.state.categoryName.trim(),
      parentId = this.state.parentId;
    if (categoryName) {
      _product.addCategory({ parentId, categoryName }).then(
        res => {
          _loginPage.successTips(res);
          this.props.history.push("/product-category/index");
        },
        errMsg => {
          _loginPage.errorTips(errMsg);
        }
      );
    } else {
      _loginPage.errorTips("品类名称不能为空");
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加品类" />
        <div className="col-md-12">
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-md-2 control-label">所属品类</label>
              <div className="col-md-3">
                <select
                  name="parentId"
                  className="form-control"
                  onChange={e => this.onValueChange(e)}
                >
                  <option value="0">根品类/</option>
                  {this.state.categoryList.map((category, index) => {
                    return (
                      <option value={category.id} key={index}>
                        根品类/{category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">品类名称</label>
              <div className="col-md-3">
                <input
                  type="text"
                  name="categoryName"
                  className="form-control"
                  placeholder="请输入品类名称"
                  value={this.state.name}
                  onChange={e => this.onValueChange(e)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={e => this.onSubmit()}
                >
                  提交
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryAdd;
