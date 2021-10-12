import React, { Component } from "react";
import rokok from "../assets/image/rokok.png";

export default class Product extends Component {
  render() {
    return (
      <div className={this.props.show ? "produk" : "produk hide"}>
        <div className="product-image" onClick={this.props.onClick}>
          <img
            src={this.props.image == null ? rokok : this.props.image}
            className="logo"
            alt="product"
            style={{ height: "250px" }}
          />
        </div>
        <div className="judul">
          <i>
            <b>{this.props.name}</b>
          </i>
        </div>
      </div>
    );
  }
}
