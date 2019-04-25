class LoginPage {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || "get",
        url: param.url || "",
        dataType: param.dataType || "json",
        data: param.data || null,
        success: res => {
          if (res.status === 0) {
            typeof resolve === "function" && resolve(res.data, res.msg);
          } else if (res.status === 10) {
            this.doLogin();
          } else {
            typeof reject === "function" && reject(res.msg || res.data);
          }
        },
        error: err => {
          typeof reject === "function" && reject(err.statusText);
        }
      });
    });
  }
  // 跳转登录
  doLogin() {
    window.location.href =
      "/login?redirect=" + encodeURIComponent(window.location.pathname);
  }
  // 获取URL参数
  getUrlParam(name) {
    // xxx.com?param=123&param1=456
    // ?param=123&param1=456
    let queryString = window.location.search.split("?")[1] || "",
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      result = queryString.match(reg);
    // result : ['param: 123', '', '123', '&']
    return result ? decodeURIComponent(result[2]) : null;
  }
  successTips(successMsg) {
    alert(successMsg || '操作成功！')
  }
  errorTips(errMsg) {
    alert(errMsg || "有地方出错了！");
  }
  setStorage(name, data) {
    let dataType = typeof data;
    if (dataType === "object") {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else if (["string", "number", "boolean"].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data);
    } else {
      alert("该类型不支持本地存储");
    }
  }
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return "";
    }
  }
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

export default LoginPage;
