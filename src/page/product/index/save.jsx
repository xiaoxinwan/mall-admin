import React from "react";
import PageTitle from "components/page-title/index.jsx";
import CategorySelector from "./category-selector.jsx";
import FileUploader from "util/file-uploader/index.jsx";
import LoginPage from "util/login-page.jsx";

import "./save.scss";
const _loginPage = new LoginPage();

class ProductSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 0,
      parentCategoryId: 0,
      subImages: []
    };
  }
  onCategoryChange(categoryId, parentCategoryId) {
    console.log("categoryId", categoryId, "parentCategoryId", parentCategoryId);
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
    let index = e.target.getAttribute('index'),
      subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages
    });
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
                className="form-control"
                placeholder="请输入商品名称"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="请输入商品描述"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
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
                  className="form-control"
                  placeholder="价格"
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
                  className="form-control"
                  placeholder="库存"
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
            <div className="col-md-10">详情详情详情详情详情详情详情详情</div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-primary">
              提交
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductSave;
