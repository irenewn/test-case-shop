import React, { Component } from "react";
import rokok from "../assets/image/rokok.png";
import styled from 'styled-components';

export default class Product extends Component {
  render() {
    return (
      <article className="produk">
        <div className="product-image" onClick={this.props.onClick}>
          <img
            src={this.props.image == null ? rokok : this.props.image}
            className="logo"
            alt="product"
          />
        </div>
        <header className="title">
          <h2><strong>{this.props.name}</strong></h2>
        </header>
      </article>
    );
  }
}
