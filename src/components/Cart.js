import React from "react";
import styled from "styled-components";
import { Modal, Button } from "antd";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  height: 150px;
`;

const ItemDetail = styled.div`
  margin: 20px;
  padding: 10px;
`;

const GrandTotal = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export default function Cart({ visible, productList, emptyCart, closeCart }) {
  return (
    <Modal
      centered
      title="Cart"
      visible={visible}
      onOk={closeCart}
      onCancel={closeCart}
    >
      {productList.length === 0 ? (
        <p>Your cart is Empty</p>
      ) : (
        <div>
          {productList.map((product) => {
            return (
              <Wrapper>
                <ItemInfo>
                  <Image src={product.image} />
                  <ItemDetail>
                    <h2>{product.title}</h2>
                    <strong>
                      {product.qty} x ${product.price}
                    </strong>
                    <br />
                  </ItemDetail>
                </ItemInfo>
                <GrandTotal>${product.qty * product.price}</GrandTotal>
              </Wrapper>
            );
          })}
          <Button onClick={emptyCart}>EmptyCart</Button>
        </div>
      )}
    </Modal>
  );
}
