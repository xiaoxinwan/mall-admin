import React from "react";
import "./category-selector.scss";
import Product from "service/product-service.jsx";
import LoginPage from "util/login-page.jsx";

const _product = new Product();
const _loginPage = new LoginPage();

class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: "",
      secondCategoryList: [],
      secondCategoryId: ""
    };
  }
  componentDidMount() {
    this.loadFirstCategory();
  }
  // 加载一级品类数据
  loadFirstCategory() {
    _product.getCategoryList().then(
      res => {
        this.setState({
          firstCategoryList: res
        });
      },
      errMsg => {
        _loginPage.errorTips(errMsg);
      }
    );
  }
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(
      res => {
        this.setState({
          secondCategoryList: res
        });
      },
      errMsg => {
        _loginPage.errorTips(errMsg);
      }
    );
  }
  // 选择一级品类
  onFirstCategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState(
      {
        firstCategoryId: newValue,
        secondCategoryId: 0,
        secondCategoryList: []
      },
      () => {
        // 更新二级品类列表
        this.loadSecondCategory();
        // 将一级品类暴露出去
        this.onPropsCategoryChange();
      }
    );
  }
  onSecondCategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState(
      {
        secondCategoryId: newValue
      },
      () => {
        this.onPropsCategoryChange();
      }
    );
  }
  // 传给父组件的ID
  onPropsCategoryChange() {
    // 先判断父组件是否存在onCategoryChange回调函数
    let categoryChangeAble = typeof this.props.onCategoryChange === 'function'
    if(this.state.secondCategoryId) {
      categoryChangeAble && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
    } else {
      categoryChangeAble && this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }
  render() {
    return (
      <div className="col-md-10">
        <select
          className="form-control category-select"
          onChange={e => this.onFirstCategoryChange(e)}
        >
          <option value="">请选择一级分类</option>
          {this.state.firstCategoryList.map((category, index) => {
            return (
              <option value={category.id} key={index}>
                {category.name}
              </option>
            );
          })}
        </select>
        {this.state.secondCategoryList.length ? (
          <select className="form-control category-select"
            onChange={e => this.onSecondCategoryChange(e)}>
            <option value="">请选择二级分类</option>
            {this.state.secondCategoryList.map((category, index) => {
              return (
                <option value={category.id} key={index}>
                  {category.name}
                </option>
              );
            })}
          </select>
        ) : null}
      </div>
    );
  }
}

export default CategorySelector;
