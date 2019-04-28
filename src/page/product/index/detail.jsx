import React from "react";
import PageTitle from "components/page-title/index.jsx";
import CategorySelector from "./category-selector.jsx";
import LoginPage from "util/login-page.jsx";
import Product from "service/product-service.jsx";

import "./save.scss";
const _loginPage = new LoginPage();
const _product = new Product();

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid,
      name: "",
      subTitle: "",
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      price: "",
      stock: "", // 库存
      detail: "",
      status: 1 // 商品状态1表示在售
    };
  }
  componentDidMount() {
    this.loadProduct();
  }
  // 加载商品详情
  loadProduct() {
    // 编辑功能，表单回填
    if (this.state.id) {
      _product.getProduct(this.state.id).then(
        res => {
          let images = res.subImages ? res.subImages.split(",") : [];
          res.subImages = images.map(imageUri => {
            return {
              uri: imageUri,
              url: res.imageHost + imageUri
            };
          });
          res.subTitle = res.subtitle;
          this.setState(res);
        },
        errMsg => {
          _loginPage.errorTips(errMsg);
        }
      );
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品详情页" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.subTitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              readOnly
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
            />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-2">
              <div className="input-group">
                <input
                  readOnly
                  type="number"
                  className="form-control"
                  value={this.state.price}
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-2">
              <div className="input-group">
                <input
                  readOnly
                  type="number"
                  className="form-control"
                  value={this.state.stock}
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {this.state.subImages.length ? (
                this.state.subImages.map((image, index) => (
                  <div className="image-container" key={index}>
                    <img src={image.url} />
                  </div>
                ))
              ) : (
                <span>暂无图片</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div
              className="col-md-10"
              dangerouslySetInnerHTML={{ __html: this.state.detail }}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ProductDetail;
