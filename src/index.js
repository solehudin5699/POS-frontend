import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
// import $ from 'jquery';
// import Popper from 'popper.js';
// import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-toastify/dist/ReactToastify.css';
// import App from './App';
import AppRouter from "./AppRouter";
// import Login from './pages/login'
// import AddUser from "./components/modals/AddUser";
import * as serviceWorker from "./serviceWorker";
// import './bootstrap/bootstrap/js/bootstrap.min.js';
// import './bootstrap/js/jquery-1.10.2.min.js';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./redux/store";

const App=()=>{
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter/>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
