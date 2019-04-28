import React from "react";
import PageTitle from "components/page-title/index.jsx";
import CategorySelector from "./category-selector.jsx";
import FileUploader from "util/file-uploader/index.jsx";
import LoginPage from "util/login-page.jsx";
import RichEditor from "util/rich-editor/index.jsx";
import Product from "service/product-service.jsx";

import "./save.scss";
const _loginPage = new LoginPage();
const _product = new Product();

class ProductSave extends React.Component {
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
          res.defaultDetail = res.detail;
          this.setState(res);
        },
        errMsg => {
          _loginPage.errorTips(errMsg);
        }
      );
    }
  }
  // 普通选项值变化
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId,
      parentCategoryId
    });
  }
  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages: subImages
    });
  }
  onUploadError(errMsg) {
    _loginPage.errorTips(errMsg);
  }
  onImageDelete(e) {
    let index = e.target.getAttribute("index"),
      subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages
    });
  }
  // 富文本编辑器的值改变
  onEditorValueChange(value) {
    this.setState({
      detail: value
    });
  }
  transformSubImagesToString() {
    return this.state.subImages.map(image => image.uri).join(",");
  }
  onSubmit() {
    let product = {
        name: this.state.name,
        subTitle: this.state.subTitle,
        categoryId: parseInt(this.state.categoryId),
        parentCategoryId: parseInt(this.state.parentCategoryId),
        subImages: this.transformSubImagesToString(),
        detail: this.state.detail,
        price: parseFloat(this.state.price),
        stock: parseInt(this.state.stock),
        status: this.state.status
      },
      productCheckResult = _product.checkProduct(product);
    if (this.state.id) {
      product.id = this.state.id;
    }
    if (productCheckResult.status) {
      _product.saveProduct(product).then(
        res => {
          _loginPage.successTips(res);
          this.props.history.push("/product/index");
        },
        errMsg => _loginPage.errorTips(errMsg)
      );
    } else {
      _loginPage.errorTips(productCheckResult.msg);
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="请输入商品名称"
                value={this.state.name}
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input
                type="text"
                name="subTitle"
                className="form-control"
                placeholder="请输入商品描述"
                value={this.state.subTitle}
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              onCategoryChange={(categoryId, parentCategoryId) =>
                this.onCategoryChange(categoryId, parentCategoryId)
              }
            />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-2">
              <div className="input-group">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="价格"
                  value={this.state.price}
                  onChange={e => this.onValueChange(e)}
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
                  type="number"
                  name="stock"
                  className="form-control"
                  placeholder="库存"
                  value={this.state.stock}
                  onChange={e => this.onValueChange(e)}
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
                    <i
                      className="fa fa-close"
                      index={index}
                      onClick={e => this.onImageDelete(e)}
                    />
                  </div>
                ))
              ) : (
                <span>暂无图片</span>
              )}
            </div>
            <div className="col-md-offset-2 col-md-10 file-uploader-container">
              <FileUploader
                onSuccess={res => this.onUploadSuccess(res)}
                onError={err => this.onUploadError(err)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={value => this.onEditorValueChange(value)}
              />
            </div>
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
    );
  }
}
export default ProductSave;
