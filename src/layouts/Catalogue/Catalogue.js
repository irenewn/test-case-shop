import React, { useEffect, useState } from "react";
import { Product, NavigationBar, Cart, AddProduct } from "../../components";
import { ProductApi } from "../../api";
import "antd/dist/antd.css";
import styled from "styled-components";

export default function NewCatalogue() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [showModalCart, setShowModalCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(0);
  const [grandTotal, setGrandtotal] = useState(0.0);

  function getDataProducts() {
    return ProductApi.get()
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
  }

  useEffect(() => {
    document.title = "Katalog Produk";
    getDataProducts();
  });

  function showModal(product) {
    setShowModalProduct(true);
    setSelectedProduct(product);
  }

  function handlerEmptyCart() {
    setCart([]);
  }

  function handleCancel() {
    setShowModalProduct(false);
    setSelectedProduct({});
    setQuantity(1);
  }

  function handleCancelCart() {
    setShowModalCart(false);
  }

  function addtoCartHandler() {
    var carts = cart;
    var qty = quantity;
    var position = carts
      .map(function (e) {
        return e.id;
      })
      .indexOf(selectedProduct.id);
    if (position < 0) {
      //new insert
      var objInserted = {
        ...selectedProduct,
        qty,
      };
      carts.push(objInserted);
    } else {
      var obj = carts[position];
      var objInserted = { ...obj, qty: obj.qty + this.state.qty };
      carts[position] = objInserted;
    }
    setShowModalProduct(false);
    setQuantity(1);
    setSelectedProduct({});
    recalculateGrandTotal();
  }

  function recalculateGrandTotal() {
    var grandTotal = 0.0,
      itemTotal = 0;

    cart.map((v) => {
      grandTotal += v.qty * v.price;
      itemTotal += v.qty;
    });

    setGrandtotal(grandTotal);
    setItemTotal(itemTotal);
  }

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

  return (
    <Wrapper>
      <NavigationBar
        onClick={() => {
          setShowModalCart(false);
        }}
      />
      <aside>
        <AddProduct
          visible={showModalProduct}
          product={selectedProduct}
          closeProduct={handleCancel}
          addToCart={addtoCartHandler}
        />
        <Cart
          visible={showModalCart}
          productList={cart}
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
