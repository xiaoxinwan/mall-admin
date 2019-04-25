import React from "react";

class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "productId", // ['productId', 'productName']
      searchKeyword: ""
    };
  }
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim();
    this.setState({
      [name]: value
    });
  }
  onSearch() {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword);
  }
  onSearchKeywordKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSearch();
    }
  }
  render() {
    return (
      <div className="row search-wrapper">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select
                name="searchType"
                className="form-control"
                onChange={e => {
                  this.onValueChange(e);
                }}
              >
                <option value="productId">商品ID</option>
                <option value="productName">商品名称</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="searchKeyword"
                className="form-control"
                placeholder="请输入关键词"
                onChange={e => {
                  this.onValueChange(e);
                }}
                onKeyUp={e => {
                  this.onSearchKeywordKeyUp(e);
                }}
              />
            </div>
            <button className="btn btn-primary" onClick={e => this.onSearch()}>
              搜索
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ListSearch;
