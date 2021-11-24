import React, { useEffect, useReducer, useState } from "react";
import { Product, NavigationBar, Cart, AddProduct } from "../../components";
import { ProductApi } from "../../api";
import "antd/dist/antd.css";
import styled from "styled-components";
import useProductReducer from "../../components/ProductReducer";
import useCartReducer from "../../components/CartReducer";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  padding-top: 20px;
  width: 100%;
  background: white;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 50pt;
  font-weight: 700;
  text-align: center;
`;

const Products = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75%;
`;

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [showModalCart, setShowModalCart] = useState(false);

  const { state, actions } = useProductReducer();
  const { stateCart, actionCarts } = useCartReducer();

  useEffect(() => {
    ProductApi.get()
      .then((res) => res.json())
      .then((res) => {
        console.log(`res`, res);
        setProducts(res);
      });
  }, []);

  function showModal(product) {
    actions.changeValue(product);
  }

  function handlerEmptyCart() {
    actionCarts.reset();
  }

  function handleCancel() {
    actions.reset();
  }

  function handleCancelCart() {
    setShowModalCart(false);
  }

  function addtoCartHandler() {
    var carts = stateCart.cart;
    var qty = state.quantity;
    var position = carts
      .map(function (e) {
        return e.id;
      })
      .indexOf(state.selectedProduct.id);
    if (position < 0) {
      //new insert
      var objInserted = {
        ...state.selectedProduct,
        qty,
      };
      carts.push(objInserted);
    } else {
      var obj = carts[position];
      var objInserted = { ...obj, qty: obj.qty + state.quantity };
      carts[position] = objInserted;
    }
    actions.reset();
    recalculateGrandTotal();
  }

  function recalculateGrandTotal() {
    var grandTotal = 0.0,
      itemTotal = 0;

    stateCart.cart.map((v) => {
      grandTotal += v.qty * v.price;
      itemTotal += v.qty;
    });

    actionCarts.changeTotal(itemTotal, grandTotal);
  }

  return (
    <Wrapper>
      <NavigationBar
        onClick={() => {
          setShowModalCart(true);
        }}
      />
      <aside>
        <AddProduct
          visible={state.showModalProduct}
          product={state.selectedProduct}
          closeProduct={handleCancel}
          addToCart={addtoCartHandler}
          setQuantity={(quantity) => actions.changeQuantity(quantity)}
        />
        <Cart
          visible={showModalCart}
          productList={stateCart.cart}
          emptyCart={handlerEmptyCart}
          closeCart={handleCancelCart}
        />
      </aside>
      <Main>
        <Title>Product Catalogue</Title>
        <Products>
          {products.map((product) => {
            return (
              <Product
                name={product.title}
                image={product.image}
                onClick={() => {
                  showModal(product);
                }}
              />
            );
          })}
        </Products>
      </Main>
    </Wrapper>
  );
}
