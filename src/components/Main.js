import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  getProductsAPICreator,
  selectProductCreator,
  resetStatusCreator,
} from "../redux/actions/products";

const Main = (props) => {
  const { products, productsOrdered, isPending, statusPost } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAPICreator(""));
  }, []);
  const notifyError = () =>
    toast.error("Sorry, order is failed", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifySuccess = () =>
    toast.success("Order products is success", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    if (statusPost === 200) {
      notifySuccess();
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    } else if (statusPost === 500) {
      notifyError();
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    }
  }, [statusPost]);
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log(bottom);
    }
  };
  return (
    <div className='main' onScroll={handleScroll}>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isPending ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : products.length ? (
        <div className='row'>
          {products.map((product, index) => {
            return (
              <div
                key={index.toString()}
                className='col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                <div className='card bg-transparent'>
                  <img
                    src={
                      product.product_image.split("")[0] === "/"
                        ? `${process.env.REACT_APP_API_URL}${product.product_image}`
                        : product.product_image
                    }
                    className='card-img-top'
                    alt=''
                  />

                  <div className='card-img-overlay'>
                    <label className='container1' title='Click for order'>
                      <input
                        type='checkbox'
                        value={product.product_id}
                        name={product.product_name}
                        onChange={(e) => {
                          dispatch(selectProductCreator(e));
                        }}
                        checked={
                          productsOrdered.find((item) => {
                            return item.product_id === product.product_id;
                          })
                            ? true
                            : false
                        }
                      />
                      <span className='checkmark'></span>
                    </label>
                  </div>

                  <div className='card-body'>
                    <p className='card-title'>{product.product_name}</p>
                    <p className='card-text'>Rp {product.product_price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3 style={{ textAlign: "center" }}>Empty</h3>
      )}

      {/* {this.props.products.products.map((product, index) => {
            return (
              <div
                key={index.toString()}
                className='col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                <div className='card bg-transparent'>
                  <img
                    src={product.product_image}
                    className='card-img-top'
                    alt=''
                  />

                  <div className='card-img-overlay'>
                    <label className='container1' title='Click for order'>
                      <input
                        type='checkbox'
                        value={product.product_id}
                        name={product.product_name}
                        onChange={(e) => {
                          this.props.selectProduct(e);
                        }}
                        checked={
                          this.props.products.productsOrdered.find((item) => {
                            return item.product_id === product.product_id;
                          })
                            ? true
                            : false
                        }
                      />
                      <span className='checkmark'></span>
                    </label>
                  </div>

                  <div className='card-body'>
                    <p className='card-title'>{product.product_name}</p>
                    <p className='card-text'>Rp {product.product_price}</p>
                  </div>
                </div>
              </div>
            );
          })} */}
      {/* </div> */}
    </div>
  );
};

export default Main;
