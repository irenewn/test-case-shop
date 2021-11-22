import React from "react";
import styled from "styled-components";
import { Modal, Button, InputNumber } from "antd";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  height: 250px;
`;

const ProductInfo = styled.div`
  margin: 20px;
  padding: 10px;
`;

const Description = styled.p`
  font-size: 12px;
  display: block;
`;

export default function AddProduct({
  visible,
  product,
  closeProduct,
  addToCart,
  setQuantity,
}) {
  return (
    <Modal
      centered
      title="Selected Product"
      visible={visible}
      onOk={closeProduct}
      onCancel={closeProduct}
      footer={[
        <Button key="back" onClick={addToCart}>
          Add to Cart
        </Button>,
        <Button key="link" type="primary" onClick={closeProduct}>
          Cancel
        </Button>,
      ]}
    >
      <Wrapper>
        <Image src={product.image} />
        <ProductInfo>
          <h2>
            <strong>{product.title}</strong>
          </h2>
          <Description>
            {product.description}
            <br />
            <strong>${product.price}</strong>
          </Description>
          <InputNumber min={1} defaultValue={1} onChange={setQuantity} />
        </ProductInfo>
      </Wrapper>
    </Modal>
  );
}
