import React, { useEffect, useReducer, useState } from "react";
import { Product, NavigationBar, Cart, AddProduct } from "../../components";
import { ProductApi } from "../../api";
import "antd/dist/antd.css";
import styled from "styled-components";

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

  const initialStateProduct = {
    selectedProduct: {},
    showModalProduct: false,
    quantity: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialStateProduct);

  function reducer(state, action) {
    switch (action.type) {
      case "changeValue":
        return {
          ...state,
          showModalProduct: true,
          selectedProduct: action.value,
        };
      case "changeQuantity":
        return { ...state, quantity: action.quantity };
      case "reset":
        return initialStateProduct;
      default:
        throw new Error();
    }
  }

  const initialStateCart = {
    cart: [],
    itemTotal: 0,
    grandTotal: 0,
  };

  const [stateCart, dispatchCart] = useReducer(reducerCart, initialStateCart);

  function reducerCart(stateCart, action) {
    switch (action.type) {
      case "changeTotal":
        return {
          ...stateCart,
          itemTotal: action.itemTotal,
          grandTotal: action.grandTotal,
        };
      case "reset":
        return initialStateCart;
    }
  }

  useEffect(() => {
    ProductApi.get()
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
  }, []);

  function showModal(product) {
    dispatch({
      type: "changeValue",
      value: product,
    });
  }

  function handlerEmptyCart() {
    dispatchCart({
      type: "reset",
    });
  }

  function handleCancel() {
    dispatch({
      type: "reset",
    });
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
      var objInserted = { ...obj, qty: obj.qty + this.state.qty };
      carts[position] = objInserted;
    }
    dispatch({
      type: "reset",
    });
    recalculateGrandTotal();
  }

  function recalculateGrandTotal() {
    var grandTotal = 0.0,
      itemTotal = 0;

    stateCart.cart.map((v) => {
      grandTotal += v.qty * v.price;
      itemTotal += v.qty;
    });

    dispatchCart({
      type: "changeTotal",
      itemTotal: itemTotal,
      grandTotal: grandTotal,
    });
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
          setQuantity={(quantity) =>
            dispatch({
              type: "changeQuantity",
              quantity: quantity,
            })
          }
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
                key={product.id}
                id={product.id}
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
