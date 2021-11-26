import { useReducer } from "react";
import { Product } from "./types";

interface ProductReducerState {
  selectedProduct: Product | {};
  showModalProduct: boolean;
  quantity: number;
}

interface ChangeValueAction {
  type: "changeValue";
  value: Product;
}

interface ChangeQuantityAction {
  type: "changeQuantity";
  quantity: number;
}

interface ResetAction {
  type: "reset";
}

type ProductAction = ResetAction | ChangeValueAction | ChangeQuantityAction;

const initialProductState = {
  selectedProduct: {},
  showModalProduct: false,
  quantity: 1,
};

function productReducer(state: ProductReducerState, action: ProductAction) {
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
      return initialProductState;
    default:
      throw new Error();
  }
}

export default function useProductReducer() {
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  const actions = {
    changeValue: (value: Product) => dispatch({ type: "changeValue", value }),
    changeQuantity: (quantity: number) =>
      dispatch({ type: "changeQuantity", quantity }),
    reset: () => dispatch({ type: "reset" }),
  };

  return { state, actions };
}
