import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "components/page-title/index.jsx";
import Product from "service/product-service.jsx";
import LoginPage from "util/login-page.jsx";
import TableList from "util/table-list/index.jsx";
import Pagination from "util/pagination/index.jsx";
import ListSearch from "./index-list-search.jsx";
import "./index.scss";
const _product = new Product();
const _loginPage = new LoginPage();

class ProductList extends React.Component {
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
    this.loadProductList();
  }
  loadProductList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    listParam.pageSize = this.state.pageSize;
    if (this.state.listType === "search") {
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    _product.getProductList(listParam).then(
      res => {
        this.setState(res);
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
      this.loadProductList();
    });
  }
  onSetProductStatus(e, productId, status) {
    let newStatus = status === 1 ? 2 : 1,
      confirmTips = status === 1 ? "确定要下架该商品？" : "确定要上架该商品？";
    if (window.confirm(confirmTips)) {
      _product
        .setProductStatus({
          productId,
          status: newStatus
        })
        .then(
          res => {
            _loginPage.successTips(res);
            this.loadProductList();
          },
          errMsg => {
            _loginPage.errorTips(errMsg);
          }
        );
    }
  }
  onSearch(searchType, searchKeyword) {
    let listType = searchKeyword === "" ? "list" : "search";
    this.setState(
      {
        listType,
        pageNum: 1,
        searchType,
        searchKeyword
      },
      () => {
        this.loadProductList();
      }
    );
  }
  render() {
    let tableHeads = [
      { name: "商品ID", width: "10%" },
      { name: "商品信息", width: "50%" },
      { name: "价格", width: "10%" },
      { name: "状态", width: "15%" },
      { name: "操作", width: "15%" }
    ];
    return (
      <div id="page-wrapper">
        <PageTitle title="商品管理页" />
        <ListSearch
          onSearch={(searchType, searchKeyword) => {
            this.onSearch(searchType, searchKeyword);
          }}
        />
        <TableList tableHeads={tableHeads}>
          {this.state.list.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>
                  <p>{product.name}</p>
                  <p>{product.subtitle}</p>
                </td>
                <td>¥{product.price}</td>
                <td>
                  <p>{product.status === 1 ? "在售" : "已下架"}</p>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={e =>
                      this.onSetProductStatus(e, product.id, product.status)
                    }
                  >
                    {product.status === 1 ? "下架" : "上架"}
                  </button>
                </td>
                <td>
                  <Link
                    className="operate"
                    to={`/product/detail/${product.id}`}
                  >
                    详情
                  </Link>
                  <Link className="operate" to={`/product/save/${product.id}`}>
                    编辑
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

export default ProductList;
