import React, { Component } from "react";
import rokok from "../assets/image/rokok.png";

export default class Product extends Component {
  render() {
    return (
      <div className="produk">
        <div className="product-image" onClick={this.props.onClick}>
          <img
            src={this.props.image == null ? rokok : this.props.image}
            className="logo"
            alt="product"
          />
        </div>
        <div className="title">
          <strong>{this.props.name}</strong>
        </div>
      </div>
    );
  }
}
