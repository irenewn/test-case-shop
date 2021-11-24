import { useReducer } from "react";
import { Product } from "./types";

interface CartState {
  cart: Product[],
  itemTotal: number,
  grandTotal: number,
};

interface ChangeTotalAction {
  type: "changeTotal",
  itemTotal: number,
  grandTotal: number,
}

interface ResetAction {
  type: "reset",
}

type CartAction = ResetAction | ChangeTotalAction;

const initialStateCart: CartState = {
  cart: [],
  itemTotal: 0,
  grandTotal: 0.0,
}

function cartReducer(cartState: CartState, action: CartAction) {
  switch (action.type) {
    case "changeTotal":
      return {
        ...cartState,
        itemTotal: action.itemTotal,
        grandTotal: action.grandTotal,
      };
    case "reset":
      return initialStateCart;
  }
}

export default function useCartReducer() {
  const [stateCart, dispatch] = useReducer(cartReducer, initialStateCart);
  const actionsOnCart = {
    changeTotal: (itemTotal: number, grandTotal: number) => dispatch({
      type: "changeTotal",
      itemTotal,
      grandTotal,
    }),
    reset: () => dispatch({ type: "reset" }),
  };

  return { stateCart, actionsOnCart };
}
