import styled from "styled-components";
import { Modal, Button } from "antd";
import { Product } from "./types";

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

interface CartState {
  visible: boolean,
  productList: Product[],
  emptyCart: () => void,
  closeCart: () => void,
}

export default function Cart({ visible, productList, emptyCart, closeCart }: CartState) {
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
            const quantity = product?.qty ?? 0
            return (
              <Wrapper>
                <ItemInfo>
                  <Image src={product.image} />
                  <ItemDetail>
                    <h2>{product.title}</h2>
                    <strong>
                      {quantity} x ${product.price}
                    </strong>
                    <br />
                  </ItemDetail>
                </ItemInfo>
                <GrandTotal>${quantity * product.price}</GrandTotal>
              </Wrapper>
            );
          })}
          <Button onClick={emptyCart}>EmptyCart</Button>
        </div>
      )}
    </Modal>
  );
}
