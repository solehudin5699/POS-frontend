import {
  getProducts,
  selectProducts,
  changeQuantity,
  cancelOrder,
  resetStatus,
} from "./actionTypes";
import { createAsyncAction } from "redux-promise-middleware-actions";
// import axios from "axios";
import { getProductsAPI, addProductsAPI, deleteProductsAPI, updateProductsAPI } from "../../utils/requestProducts";
import { postOrderAPI, getAllOrderAPI } from "../../utils/requestOrder";

export const getProductsAPICreator = createAsyncAction(
  getProducts,
  async (keyword, price, time, category, page) => {
    const res = await getProductsAPI(keyword, price, time, category, page);
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

export const getAllOrderAPICreator = createAsyncAction(
  "getAllOrder",
  async () => {
    const res = await getAllOrderAPI();
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

export const resetStatusCreator = () => {
  return {
    type: resetStatus,
  };
};

export const resetProductCreator = () => {
  return {
    type: "RESETPRODUCT",
  };
};

export const keywordCreator = (key) => {
  return {
    type: "SETKEYWORD",
    payload:key
  };
};

export const deleteItemOrderCreator = (id) => {
  return {
    type: "DELETE_ITEM_ORDER",
    payload:id
  };
};

export const deleteProductAPICreator = createAsyncAction(
  "DELETE_PRODUCT",
  async (id,body) => {
    const res = await deleteProductsAPI(id,body);
    return res.data;
  }
);

export const updateProductAPICreator = createAsyncAction(
  "UPDATE_PRODUCT",
  async (id,body) => {
    const res = await updateProductsAPI(id,body);
    return res.data;
  }
);