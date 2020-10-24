import {
  selectProducts,
  changeQuantity,
  cancelOrder,
} from "../actions/actionTypes";
import {
  getProductsAPICreator,
  postOrderAPICreator,addProductsAPICreator
} from "../actions/products";

const initialCart = {
  products: [],
  idProductOrdered: [],
  productsOrdered: [],
  totalPrice: 0,
  error: undefined,
  isPending: false,
  isFulFilled: false,
  isRejected: false,

  errorPost: undefined,
  isPostPending: false,
  isPostFulFilled: false,
  isPostRejected: false,

  errorAdd: undefined,
  isAddPending: false,
  isAddFulFilled: false,
  isAddRejected: false,
};

const productsReducer = (prevState = initialCart, action) => {
  switch (action.type) {
    case String(getProductsAPICreator.pending):
      return {
        ...prevState,
        isPending: true,
      };
    case String(getProductsAPICreator.fulfilled):
      return {
        ...prevState,
        products: action.payload.data,
        error: undefined,
        isPending: false,
        isFulFilled: true,
        isRejected: false,
      };
    case String(getProductsAPICreator.rejected):
      return {
        ...prevState,
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
    case String(postOrderAPICreator.fulfilled):
      return {
        ...prevState,
        errorPost: undefined,
        isPostPending: false,
        isPostFulFilled: true,
        isPostRejected: false,
        productsOrdered: [],
        totalPrice: 0,
      };
    case String(postOrderAPICreator.rejected):
      return {
        ...prevState,
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
    case String(addProductsAPICreator.fulfilled):
      return {
        ...prevState,
        errorAdd: undefined,
        isAddPending: false,
        isAddFulFilled: true,
        isAddRejected: false,
      };
    case String(addProductsAPICreator.rejected):
      return {
        ...prevState,
        errorAdd: action.payload,
        isAddRejected: true,
        isAddPending: false,
        isAddFulFilled: false,
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
        } else if(!checked) {
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
    default:
      return prevState;
  }
};

export default productsReducer;
