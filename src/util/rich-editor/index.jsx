import React from "react";
import Simditor from "simditor";
import "simditor/styles/simditor.scss";
import "./index.scss";

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.loadEditor();
  }
  componentWillReceiveProps(newProps) {
    if (this.props.defaultDetail !== newProps.defaultDetail) {
      this.editor.setValue(newProps.defaultDetail);
    }
  }
  loadEditor() {
    let element = this.refs["textarea"];
    this.editor = new Simditor({
      textarea: $(element),
      placeholder: this.props.placeholder || "请输入内容",
      defaultImage: "",
      upload: {
        url: "/manage/product/richtext_img_upload.do",
        fileKey: "upload_file"
      }
    });
    this.bindEditorEvent();
  }
  // 初始化富文本编辑器的事件
  bindEditorEvent() {
    this.editor.on("valuechanged", e => {
      this.props.onValueChange(this.editor.getValue());
    });
  }
  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea" />
      </div>
    );
  }
}

export default RichEditor;
