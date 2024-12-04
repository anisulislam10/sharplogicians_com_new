import React from "react";
import { Quill } from "react-quill";
import "./style.css";

// Custom Divider Blot (horizontal line)
const BlockEmbed = Quill.import("blots/block/embed");
class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";
Quill.register(DividerBlot);




// Custom Emphasis (italic) Blot
const Inline = Quill.import("blots/inline");
class EmphBlot extends Inline {}
EmphBlot.blotName = "em";
EmphBlot.tagName = "em";
EmphBlot.className = "custom-em";
Quill.register("formats/em", EmphBlot);


// Border Format Handler
function addBorder() {
  const range = this.quill.getSelection();
  if (range) {
    this.quill.format("em", true);
  }
}

// Font and Size Whitelist
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
  "times-new-roman",
  "verdana",
  "calibri",
  "georgia"
];
Quill.register(Font, true);

export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      border: addBorder,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
  "em",
  "p",
  "divider",
  "hr",
  "video",
  "highlight",
  "audio",
  "font-size",
  "special-character",
  "formats/em",
];

// Quill Toolbar Component
export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
        <option value="times-new-roman">Times New Roman</option>
        <option value="verdana">Verdana</option>
        <option value="calibri">Calibri</option>
      </select>
      <select className="ql-size" defaultValue="normal">
        <option value="small">Small</option>
        <option value="normal">Normal</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-blockquote" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-background" />
      <button className="ql-color" />
      <button className="ql-video" />
      <button className="ql-audio" />
    </span>
    <span className="ql-formats">
      <button className="ql-align" value="left" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />
    </span>
    <span className="ql-formats">
      <button className="ql-code-block" />
      <button className="ql-divider" />
      <button className="ql-emoji" />
      <button className="ql-special-character" />
      <button className="ql-undo" />
      <button className="ql-redo" />
    </span>
  </div>
);

export default QuillToolbar;
