import { useReducer } from "react";

const initialStateProduct = {
  selectedProduct: {},
  showModalProduct: false,
  quantity: 1,
};

function productReducer(state, action) {
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

const actions = {
  changeValue: (value) => ({ type: "changeValue", value }),
  changeQuantity: (quantity) => ({ type: "changeQuantity", quantity }),
  reset: () => ({ type: "reset" }),
};

export default function useProductReducer() {
  const [state, dispatch] = useReducer(productReducer, initialStateProduct);

  return { state, actions };
}
