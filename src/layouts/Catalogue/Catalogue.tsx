import { useEffect, useState } from "react";
import { ContentProduct, NavigationBar, Cart, AddProduct } from "../../components";
import { ProductApi } from "../../api";
import "antd/dist/antd.css";
import styled from "styled-components";
import useProductReducer from "../../components/ProductReducer";
import useCartReducer from "../../components/CartReducer";
import { Product } from "../../components/types";

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
  let listProduct: Product[];
  listProduct = [];

  const [showModalCart, setShowModalCart] = useState(false);

  const { state, actions } = useProductReducer();
  const { stateCart, actionsOnCart } = useCartReducer();

  useEffect(() => {
    ProductApi.get()
      .then((res) => res.json())
      .then((res) => {
        listProduct = res;
        console.log(`listProd: `, listProduct);
      });
  }, []);

  function showModal(product: Product) {
    actions.changeValue(product);
  }

  function handlerEmptyCart() {
    actionsOnCart.reset();
  }

  function handleCancel() {
    actions.reset();
  }

  function handleCancelCart() {
    setShowModalCart(false);
  }

  function addtoCartHandler() {
    if(state.selectedProduct !== undefined){
      actionsOnCart.add(state.selectedProduct, state.quantity);
      actions.reset();
    }
    recalculateGrandTotal();
  }

  function recalculateGrandTotal() {
    var grandTotal = 0.0,
      itemTotal = 0;

    stateCart.cart.map((v: Product) => {
      const qty = v?.qty ?? 0
        grandTotal += qty * v.price;
        itemTotal += qty;
    });

    actionsOnCart.changeTotal(itemTotal, grandTotal);
  }

  return (
    <Wrapper>
      <NavigationBar
        onClick={() => {
          setShowModalCart(true);
        }}
      />
      <aside>
        {state.selectedProduct && 
        <AddProduct
          visible={state.showModalProduct}
          product={state.selectedProduct}
          closeProduct={handleCancel}
          addToCart={addtoCartHandler}
          setQuantity={(quantity: number) => actions.changeQuantity(quantity)}
        />
        }
        <Cart
          visible={showModalCart}
          productList={stateCart.cart}
          emptyCart={handlerEmptyCart}
          closeCart={handleCancelCart}
        />
      </aside>
      <Main>
        <Title>Product Catalogue</Title>
        {console.log(listProduct)}
        <Products>
          {listProduct.map((product) => {
            return (
              <ContentProduct
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
