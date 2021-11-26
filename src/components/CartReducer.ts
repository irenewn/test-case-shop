import { useReducer } from "react";
import { Product } from "./types";

interface CartState {
  cart: Product[];
  itemTotal: number;
  grandTotal: number;
}

interface AddProductToCartAction {
  type: "add";
  product: Product;
  numberToAdd: number;
}

interface ChangeTotalAction {
  type: "changeTotal";
  itemTotal: number;
  grandTotal: number;
}

interface ResetAction {
  type: "reset";
}

type CartAction = ResetAction | ChangeTotalAction | AddProductToCartAction;

const initialStateCart: CartState = {
  cart: [],
  itemTotal: 0,
  grandTotal: 0.0,
};

function cartReducer(cartState: CartState, action: CartAction) {
  switch (action.type) {
    case "changeTotal":
      return {
        ...cartState,
        itemTotal: action.itemTotal,
        grandTotal: action.grandTotal,
      };
    case "add":
      const product = action.product;
      const currentCart = [...cartState.cart];
      const cartContainsProduct =
        currentCart.findIndex((item) => item.id === product.id) !== -1;
      const addPrice = product.price * action.numberToAdd;

      if (!cartContainsProduct) {
        currentCart.push(product);
      }

      return {
        cart: currentCart,
        itemTotal: cartState.itemTotal + action.numberToAdd,
        grandTotal: cartState.grandTotal + addPrice,
      };
    case "reset":
      return initialStateCart;
  }
}

export default function useCartReducer() {
  const [stateCart, dispatch] = useReducer(cartReducer, initialStateCart);
  const actionsOnCart = {
    changeTotal: (itemTotal: number, grandTotal: number) =>
      dispatch({
        type: "changeTotal",
        itemTotal,
        grandTotal,
      }),
    add: (product: Product, numberToAdd: number) =>
      dispatch({ type: "add", product, numberToAdd }),
    reset: () => dispatch({ type: "reset" }),
  };

  return { stateCart, actionsOnCart };
}
