import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import {
  getProductsAPICreator,
  selectProductCreator,
} from "../redux/actions/products";
import { requestProductsCreator } from "../redux/actions/requestProducts";

require("dotenv").config();

class Main extends React.Component {
  componentDidMount = () => {
    this.props.getProduct("");
  };
  componentDidUpdate = () => {
    if (this.props.products.isPostFulFilled) {
      toast.success("Order products is success!");
    } else if (this.props.products.isPostRejected) {
      toast.error("Sorry, order is failed");
    }
  };

  render() {
    // console.log(this.props.products.products);
    return (
      <div className='main'>
        <ToastContainer />
        {this.props.products.isPending ? (
          <h3 style={{ textAlign: "center" }}>Loading...</h3>
        ) : this.props.products.products.length ? (
          <div className='row'>
            {this.props.products.products.map((product, index) => {
              return (
                <div
                  key={index.toString()}
                  className='col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                  <div className='card bg-transparent'>
                    <img
                      src={
                        product.product_image.split("")[0] === "/"
                          ? `${process.env.REACT_APP_SERVER}${product.product_image}`
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
  }
}

const mapStateToProps = (state) => {
  const { products, requestAPIProducts } = state;
  return { products, requestAPIProducts };
};

const mapDispatchToProps = (dispacth) => {
  return {
    getProduct: (keyword) => {
      dispacth(getProductsAPICreator(keyword));
    },
    selectProduct: (event) => {
      dispacth(selectProductCreator(event));
    },
    requestProducts: () => {
      dispacth(requestProductsCreator(""));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
