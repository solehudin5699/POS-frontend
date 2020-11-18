/* eslint-disable */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import History from "./pages/history";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsAPICreator,
  resetProductCreator,
} from "./redux/actions/products";
import { useReactPWAInstall } from "react-pwa-install";
import logoApp from "./assets/image/logo192.png";

const notifyError = (msg) =>
  toast.error(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const notifySuccess = (msg) =>
  toast.success(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

function AppRouter() {
  const dispatch = useDispatch();
  const { statusRegist } = useSelector((state) => state.authAPI);
  const { statusAdd, statusDelete, statusUpdate, statusPost } = useSelector(
    (state) => state.products
  );
  const { time, price, category } = useSelector((state) => state.filter);
  useEffect(() => {
    if (statusRegist === 200) {
      notifySuccess("Success add user");
    } else if (statusRegist === 500) {
      notifyError("Failed add user");
    }
  }, [statusRegist]);
  useEffect(() => {
    if (statusAdd === 200) {
      let categoryId;
      if (Number(category) === 0) {
        categoryId = "";
      } else {
        categoryId = category;
      }
      dispatch(resetProductCreator());
      dispatch(getProductsAPICreator("", price, time, categoryId, 1));
      notifySuccess("Success add product");
    } else if (statusAdd === 500) {
      notifyError("Failed add product");
    }
  }, [statusAdd]);

  useEffect(() => {
    if (statusDelete === 200) {
      notifySuccess("Success deleting product");
    } else if (statusDelete === 500) {
      notifyError("Failed deleting product");
    }
  }, [statusDelete]);
  useEffect(() => {
    if (statusUpdate === 200) {
      notifySuccess("Success updating product");
    } else if (statusUpdate === 500) {
      notifyError("Failed updating product");
    }
  }, [statusUpdate]);
  useEffect(() => {
    if (statusPost === 200) {
      notifySuccess("Order products is success");
    } else if (statusPost === 500) {
      notifyError("Sorry, order is failed");
    }
  }, [statusPost]);

  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handleClick = () => {
    pwaInstall({
      title: "Install CitaRasa Web",
      logo: logoApp,
      features: (
        <ul>
          <li>Order product</li>
          <li>Add, delete, update product</li>
          <li>Add user</li>
          <li>etc...</li>
        </ul>
      ),
      description:
        "A web-based point of sale application that sells Indonesian specialties."
    })
      .then(() => alert("App installed successfully"))
      .catch(() => alert("App is not installed"));
  };
  return (
    <Router>
      <div>
        <PrivateRoute exact path='/' component={Home} type='private' />
        <PrivateRoute
          exact
          path='/history'
          component={History}
          type='private'
        />
        <Route path='/login' component={Login} />
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
        <div>
          {supported() && !isInstalled() && (
            <button
              style={{
                zIndex: 1200,
                position: "fixed",
                width: "100vw",
                bottom: 0,
                height: "10vw",
                display: "block",
                backgroundColor:"#57cad5",
                border:"none",
                fontSize:"15px",
                outline:"none",
                color:"#FFFFFF"
              }}
              type='button'
              onClick={handleClick}>
              Install App
            </button>
          )}
        </div>
      </div>
    </Router>
  );
}
export default AppRouter;
