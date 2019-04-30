import React from "react";

class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryType: "orderNo", // 'orderNo'
      queryOrderNo: ""
    };
  }
  onOrderNoChange(e) {
    let value = e.target.value.trim();
    this.setState({
      queryOrderNo: value
    });
  }
  onQuery() {
    this.props.onQuery(this.state.queryOrderNo);
  }
  onQueryKeywordKeyUp(e) {
    if (e.keyCode === 13) {
      this.onQuery();
    }
  }
  render() {
    return (
      <div className="row search-wrapper">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select
                className="form-control"
                onChange={e => {
                  this.onValueChange(e);
                }}
              >
                <option value="orderNo">按订单号</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="请输入订单号"
                onChange={e => {
                  this.onOrderNoChange(e);
                }}
                onKeyUp={e => {
                  this.onQueryKeywordKeyUp(e);
                }}
              />
            </div>
            <button className="btn btn-primary" onClick={e => this.onQuery()}>
              查询
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ListSearch;
