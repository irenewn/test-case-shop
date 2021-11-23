import { useReducer } from "react";

const initialStateCart = {
  cart: [],
  itemTotal: 0,
  grandTotal: 0,
};

function cartReducer(stateCart, action) {
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

const actionsOnCart = {
  changeTotal: (itemTotal, grandTotal) => ({
    type: "changeTotal",
    itemTotal,
    grandTotal,
  }),
  reset: () => ({ type: "reset" }),
};

export default function useCartReducer() {
  const [stateCart, dispatch] = useReducer(cartReducer, initialStateCart);

  return { stateCart, actionsOnCart };
}
