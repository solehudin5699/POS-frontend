/* eslint-disable */
import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useSelector, useDispatch } from "react-redux";
import { SpinnerCircular } from "spinners-react";
import {
  getProductsAPICreator,
  selectProductCreator,
  resetStatusCreator,
  resetProductCreator,
} from "../redux/actions/products";

const LoadingIndicator = () => {
  const { isPending, productBasedPage, products } = useSelector(
    (state) => state.products
  );
  return (
    <>
      <h5
        style={{
          textAlign: "center",
          height: "30px",
          marginTop: products.length == 0 ? "30vmin" : 0,
        }}>
        {isPending && products.length == 0 ? (
          <SpinnerCircular
            secondaryColor='transparent'
            thickness={50}
            style={{
              color: "#57cad5",
            }}
            size='20%'
          />
        ) : isPending && products.length > 0 ? (
          <i className='fa fa-spinner fa-spin fa-lg fa-fw'></i>
        ) : !isPending && products.length == 0 ? (
          "Empty"
        ) : !isPending && productBasedPage.length == 0 ? (
          "Finish"
        ) : null}
      </h5>
    </>
  );
};

const FetchMoreData = (props) => {
  const { isPending, productBasedPage } = useSelector(
    (state) => state.products
  );
  return (
    <div className='fetchmore'>
      <button
        onClick={props.fetchMore}
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "#57cad5",
          fontSize: "15px",
          padding: "5px",
          borderRadius: "5px",
          width: "50%",
          color: "#FFFFFF",
        }}>
        {isPending ? (
          <i className='fa fa-spinner fa-spin fa-fw'></i>
        ) : productBasedPage.length ? (
          "See more product"
        ) : (
          "Finish"
        )}
      </button>
    </div>
  );
};

const Main = (props) => {
  const {
    products,
    productsOrdered,
    isPending,
    statusPost,
    keyword,
    statusGet,
    productBasedPage,
    statusUpdate,
  } = useSelector((state) => state.products);
  // const [page, setPage] = useState(1)
  const { price, time, category } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    let categoryId;
    if (Number(category) === 0) {
      categoryId = "";
    } else {
      categoryId = category;
    }
    props.setPage(1);
    dispatch(resetProductCreator());
    dispatch(getProductsAPICreator("", price, time, categoryId, 1));
  }, []);

  const fetchMore = () => {
    console.log(keyword);
    let categoryId;
    if (Number(category) === 0) {
      categoryId = "";
    } else {
      categoryId = category;
    }
    dispatch(
      getProductsAPICreator(keyword, price, time, categoryId, props.page + 1)
    );
    if (statusGet === 200) {
      props.setPage(props.page + 1);
      dispatch(resetStatusCreator());
    }
  };
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (
      bottom &&
      !isPending &&
      productBasedPage.length &&
      Number(window.innerWidth) > 768
    ) {
      let categoryId;
      if (Number(category) === 0) {
        categoryId = "";
      } else {
        categoryId = category;
      }
      dispatch(
        getProductsAPICreator(keyword, price, time, categoryId, props.page + 1)
      );
      if (statusGet === 200) {
        props.setPage(props.page + 1);
        dispatch(resetStatusCreator());
      }
    }
  };
  const [load, setLoading] = useState(false);
  useEffect(() => {
    if (statusUpdate === 200) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [statusUpdate]);
  // console.log(window.innerWidth);
  return (
    <div className='main' onScroll={handleScroll}>
      <LoadingOverlay
        styles={{ height: "100vh" }}
        active={load}
        spinner
        text='Wait please...'>
        {products.length ? (
          <div
            className='row'
            style={{
              position: "relative",
            }}>
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

            <FetchMoreData fetchMore={fetchMore} />
          </div>
        ) : null}
        <LoadingIndicator />
        {/* {Number(window.innerWidth) > 768?(<LoadingIndicator />):null}  */}
      </LoadingOverlay>
      {/* <FetchMoreData fetchMore={fetchMore} /> */}
    </div>
  );
};

export default Main;
