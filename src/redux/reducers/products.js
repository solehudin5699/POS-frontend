import {
  selectProducts,
  changeQuantity,
  cancelOrder,
  resetStatus,
} from "../actions/actionTypes";
import {
  getProductsAPICreator,
  postOrderAPICreator,
  addProductsAPICreator,
  getAllOrderAPICreator,
  deleteProductAPICreator,
  updateProductAPICreator,
} from "../actions/products";

const initialCart = {
  products: [],
  productBasedPage: [],
  idProductOrdered: [],
  productsOrdered: [],
  totalPrice: 0,
  error: undefined,
  statusGet: null,
  isPending: false,
  isFulFilled: false,
  isRejected: false,

  statusPost: null,
  errorPost: undefined,
  isPostPending: false,
  isPostFulFilled: false,
  isPostRejected: false,

  statusGetOrder: null,
  dataGetOrder: [],
  errorGetOrder: undefined,
  isGetOrderPending: false,
  isGetOrderFulFilled: false,
  isGetOrderRejected: false,

  statusAdd: null,
  dataAdd: [],
  errorAdd: undefined,
  isAddPending: false,
  isAddFulFilled: false,
  isAddRejected: false,

  statusDelete: null,
  errorDelete: undefined,
  isDeletePending: false,
  isDeleteFulFilled: false,
  isDeleteRejected: false,

  statusUpdate: null,
  errorUpdate: undefined,
  isUpdatePending: false,
  isUpdateFulFilled: false,
  isUpdateRejected: false,

  keyword: "",
};

const productsReducer = (prevState = initialCart, action) => {
  switch (action.type) {
    case String(getProductsAPICreator.pending):
      return {
        ...prevState,
        isPending: true,
      };
    case String(getProductsAPICreator.fulfilled): {
      let status;
      let data;
      let err;
      if (action.payload.status === 200) {
        status = 200;
        data = action.payload.data;
        err = undefined;
      } else if (action.payload.status === 500) {
        status = 500;
        data = [];
        err = action.payload.error;
      }
      let newData = prevState.products.concat(data);
      return {
        ...prevState,
        products: newData,
        productBasedPage: action.payload.data,
        statusGet: status,
        error: err,
        isPending: false,
        isFulFilled: true,
        isRejected: false,
      };
    }
    case String(getProductsAPICreator.rejected):
      return {
        ...prevState,
        statusGet: 500,
        productBasedPage: [],
        error: action.payload,
        isRejected: true,
        isPending: false,
        isFulFilled: false,
      };

    case String(postOrderAPICreator.pending):
      return {
        ...prevState,
        isPostPending: true,
      };
    case String(postOrderAPICreator.fulfilled): {
      let status;
      if (action.payload.status === 200) {
        status = 200;
      } else {
        status = 500;
      }
      return {
        ...prevState,
        statusPost: status,
        errorPost: undefined,
        isPostPending: false,
        isPostFulFilled: true,
        isPostRejected: false,
        idProductOrdered: [],
        productsOrdered: [],
        totalPrice: 0,
      };
    }
    case String(postOrderAPICreator.rejected):
      return {
        ...prevState,
        statusPost: 500,
        errorPost: action.payload,
        isPostRejected: true,
        isPostPending: false,
        isPostFulFilled: false,
      };

    //Add Products
    case String(addProductsAPICreator.pending):
      return {
        ...prevState,
        isAddPending: true,
      };
    case String(addProductsAPICreator.fulfilled): {
      let status;
      let data;
      let err;
      if (action.payload.status === 200) {
        status = 200;
        data = action.payload.data;
        err = undefined;
      } else {
        status = 500;
        data = undefined;
        err = action.payload.error;
      }
      return {
        ...prevState,
        statusAdd: status,
        dataAdd: data,
        errorAdd: err,
        isAddPending: false,
        isAddFulFilled: true,
        isAddRejected: false,
      };
    }
    case String(addProductsAPICreator.rejected):
      return {
        ...prevState,
        statusAdd: 500,
        errorAdd: action.payload,
        isAddRejected: true,
        isAddPending: false,
        isAddFulFilled: false,
      };

    //GET ALLL ORDER
    case String(getAllOrderAPICreator.pending):
      return {
        ...prevState,
        isGetOrderPending: true,
      };
    case String(getAllOrderAPICreator.fulfilled): {
      let status;
      let data;
      let error;
      if (action.payload.status === 200) {
        status = 200;
        data = action.payload.data;
        error = null;
      } else {
        status = 500;
        data = [];
        error = action.payload.error;
      }
      return {
        ...prevState,
        statusGetOrder: status,
        dataGetOrder: data,
        errorGetOrder: error,
        isGetOrderPending: false,
        isGetOrderFulFilled: true,
        isGetOrderRejected: false,
      };
    }
    case String(getAllOrderAPICreator.rejected):
      return {
        ...prevState,
        statusGetOrder: 500,
        errorGetOrder: action.payload,
        isGetOrderRejected: true,
        isGetOrderPending: false,
        isGetOrderFulFilled: false,
      };

    case selectProducts:
      {
        const target = action.payload.target;
        const checked = target.checked;
        const value = Number(target.value);
        let productsOrder = prevState.products.find((item) => {
          return item.product_id === value;
        });
        if (checked) {
          if (
            !prevState.productsOrdered.find((item) => {
              return item.product_id === value;
            })
          ) {
            prevState.productsOrdered.push({
              ...productsOrder,
              numOrder: 1,
            });
            prevState.idProductOrdered.push(value);
            return {
              ...prevState,
              totalPrice:
                Number(prevState.totalPrice) +
                Number(productsOrder.product_price),
            };
          }
        } else if (!checked) {
          prevState.totalPrice =
            Number(prevState.totalPrice) -
            Number(
              prevState.productsOrdered[
                prevState.idProductOrdered.indexOf(value)
              ].product_price
            );
          prevState.productsOrdered.splice(
            prevState.idProductOrdered.indexOf(value),
            1
          );
          prevState.idProductOrdered.splice(
            prevState.idProductOrdered.indexOf(value),
            1
          );
          console.log(prevState);
          return {
            ...prevState,
          };
        }
      }
      break;
    case changeQuantity: {
      const target = action.payload.target;
      const indexOrder = Number(target.value);
      const id = target.id;
      if (id === "plus") {
        return {
          ...prevState,
          productsOrdered: prevState.productsOrdered.map((item, index) => {
            if (index === indexOrder) {
              return {
                ...item,
                numOrder: Number(item.numOrder) + 1,
                product_price:
                  Number(
                    prevState.products.find((product) => {
                      return (
                        product.product_id ===
                        prevState.productsOrdered[indexOrder].product_id
                      );
                    }).product_price
                  ) *
                  Number(prevState.productsOrdered[indexOrder].numOrder + 1),
              };
            } else {
              return item;
            }
          }),
          totalPrice:
            Number(prevState.totalPrice) +
            Number(
              prevState.products.find((item) => {
                return (
                  item.product_id ===
                  prevState.productsOrdered[indexOrder].product_id
                );
              }).product_price
            ),
        };
      } else if (
        id === "min" &&
        Number(prevState.productsOrdered[indexOrder].numOrder) >= 2
      ) {
        return {
          ...prevState,
          productsOrdered: prevState.productsOrdered.map((item, index) => {
            if (index === indexOrder) {
              return {
                ...item,
                numOrder: Number(item.numOrder) - 1,
                product_price:
                  Number(
                    prevState.products.find((product) => {
                      return (
                        product.product_id ===
                        prevState.productsOrdered[indexOrder].product_id
                      );
                    }).product_price
                  ) *
                  Number(prevState.productsOrdered[indexOrder].numOrder - 1),
              };
            } else {
              return item;
            }
          }),
          totalPrice:
            Number(prevState.totalPrice) -
            Number(
              prevState.products.find((item) => {
                return (
                  item.product_id ===
                  prevState.productsOrdered[indexOrder].product_id
                );
              }).product_price
            ),
        };
      } else {
        return {
          ...prevState,
        };
      }
    }
    case cancelOrder:
      return {
        ...prevState,
        idProductOrdered: [],
        productsOrdered: [],
        totalPrice: 0,
      };
    case "TOAST_POST_ORDER":
      return {
        ...prevState,
        isPostFulFilled: false,
        isPostRejected: false,
      };
    case resetStatus:
      return {
        ...prevState,
        statusPost: null,
        statusAdd: null,
        statusGet: null,
        statusDelete: null,
        statusUpdate: null,
      };
    case "RESETPRODUCT":
      return {
        ...prevState,
        products: [],
        productBasedPage: [],
      };
    case "SETKEYWORD":
      return {
        ...prevState,
        keyword: action.payload,
      };
    case "DELETE_ITEM_ORDER": {
      let id = action.payload;
      let newId;
      let newTotal;
      let newData;
      if (id) {
        newId = prevState.idProductOrdered.filter(
          (item) => Number(item) !== Number(id)
        );
        newTotal =
          Number(prevState.totalPrice) -
          Number(
            prevState.productsOrdered.find(
              (item) => Number(item.product_id) === Number(id)
            ).product_price
          );
        newData = prevState.productsOrdered.filter(
          (item) => Number(item.product_id) !== Number(id)
        );
      } else {
        newId = prevState.idProductOrdered;
        newTotal = prevState.totalPrice;
        newData = prevState.productsOrdered;
      }

      return {
        ...prevState,
        idProductOrdered: newId,
        totalPrice: newTotal,
        productsOrdered: newData,
      };
    }

    case String(deleteProductAPICreator.pending):
      return {
        ...prevState,
        isDeletePending: true,
      };
    case String(deleteProductAPICreator.fulfilled): {
      let status;
      let err;
      let newListProduct;
      if (action.payload.status === 200) {
        status = 200;
        err = undefined;
        newListProduct = prevState.products.filter(
          (item) => Number(item.product_id) !== Number(action.payload.data.id)
        );
      } else if (action.payload.status === 500) {
        status = 500;
        err = action.payload.error;
        newListProduct = prevState.products;
      }
      return {
        ...prevState,
        products: newListProduct,
        statusDelete: status,
        errorDelete: err,
        isDeletePending: false,
        isDeleteFulFilled: true,
        isDeleteRejected: false,
      };
    }
    case String(deleteProductAPICreator.rejected):
      return {
        ...prevState,
        statusDelete: 500,
        errorDelete: action.payload,
        isDeleteRejected: true,
        isDeletePending: false,
        isDeleteFulFilled: false,
      };

    case String(updateProductAPICreator.pending):
      return {
        ...prevState,
        isUpdatePending: true,
      };
    case String(updateProductAPICreator.fulfilled): {
      let status;
      let err;
      let newListProduct;
      if (action.payload.status === 200) {
        status = 200;
        err = undefined;
        newListProduct = prevState.products.map((item) => {
          if (Number(item.product_id) === Number(action.payload.data.id)) {
            let newItem = {
              ...item,
              product_name: action.payload.data.product_name,
              product_image: action.payload.data.product_image,
              product_price: action.payload.data.product_price,
              category_id: action.payload.data.category_id,
            };
            return newItem;
          } else {
            return item;
          }
          // Number(item.product_id)!==Number(action.payload.data.id)
        });
      } else if (action.payload.status === 500) {
        status = 500;
        err = action.payload.error;
        newListProduct = prevState.products;
      }
      return {
        ...prevState,
        products: newListProduct,
        statusUpdate: status,
        errorUpdate: err,
        isUpdatePending: false,
        isUpdateFulFilled: true,
        isUpdateRejected: false,
      };
    }
    case String(updateProductAPICreator.rejected):
      return {
        ...prevState,
        statusUpdate: 500,
        errorUpdate: action.payload,
        isUpdateRejected: true,
        isUpdatePending: false,
        isUpdateFulFilled: false,
      };
    default:
      return prevState;
  }
};

export default productsReducer;
