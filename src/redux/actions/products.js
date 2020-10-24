import {
  getProducts,
  selectProducts,
  changeQuantity,
  cancelOrder,
} from "./actionTypes";
import { createAsyncAction } from "redux-promise-middleware-actions";
// import axios from "axios";
import { getProductsAPI, addProductsAPI } from "../../utils/requestProducts";
import { postOrderAPI } from "../../utils/requestOrder";

export const getProductsAPICreator = createAsyncAction(
  getProducts,
  async (key) => {
    const res = await getProductsAPI(key);
    return res.data;
  }
);
export const postOrderAPICreator = createAsyncAction(
  "postOrder",
  async (body) => {
    const res = await postOrderAPI(body);
    return res.data;
  }
);

export const addProductsAPICreator = createAsyncAction(
  "ADDPRODUCTS",
  async (body) => {
    const res = await addProductsAPI(body);
    return res.data;
  }
);

export const selectProductCreator = (event) => {
  return {
    type: selectProducts,
    payload: event,
  };
};
export const changeQuantityCreator = (event) => {
  return {
    type: changeQuantity,
    payload: event,
  };
};
export const cancelOrderCreator = () => {
  return {
    type: cancelOrder,
  };
};

export const toastPostOrderCreator = () => {
  return {
    type: "TOAST_POST_ORDER",
  };
};
