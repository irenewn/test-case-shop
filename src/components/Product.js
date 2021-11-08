import React, { Component } from "react";
import rokok from "../assets/image/rokok.png";
import styled from "styled-components";

export default class Product extends Component {
  render() {
    const Image = styled.img`
      width: 200px;
      height: 250px;
      min-height: 250px;
      `;

    const Product = styled.li`
      width: 200px;
      height: 300px;
      margin: 30px;
      display: flex;
      flex-direction: column-reverse;
      /* align-items: flex-end; */

      /* align-self: center; */
      margin: 30px;
      justify-content: center;
      margin-bottom: 20px;
      `;

    const Title = styled.h1`
      text-align: center;
      min-height: 120px;
      padding-top: 20px;
      padding-bottom: 20px;
    `;

    return (
      <Product>
        <Title>
            <b>{this.props.name}</b>
        </Title>
        <Image
          src={this.props.image == null ? rokok : this.props.image}
          onClick={this.props.onClick}
          alt="product"
          />
      </Product>
    );
  }
}
