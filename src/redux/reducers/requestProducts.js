import { getProductsAPI ,pending, fulfilled, rejected } from "../actions/actionTypes";

const initialState = {
  data: [],
  error: "",
  isPending: false,
  isFullFilled: false,
  isRejected: false,
};

const requestProductsReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case getProductsAPI+pending:
      return {
        ...prevState,
        isPending: true,
      };
    case getProductsAPI+rejected:
      return {
        ...prevState,
        isRejected: true,
        error: action.payload,
        isPending: false,
      };
    case getProductsAPI+fulfilled:
      return {
        ...prevState,
        isFullFilled: true,
        data: action.payload,
        isPending: false,
      };
    default:
      return prevState;
  }
};

export default requestProductsReducer;
