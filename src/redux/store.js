//IMPORT LIBRARY
// import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from "redux-logger";
// import rpm from "redux-promise-middleware";
// //IMPORT FILE
// import indexReducer from "./reducers/index";

// const logger=createLogger();
// const enhancers=applyMiddleware(rpm,logger);
// const store=createStore(indexReducer, enhancers);

// export default store;
import { applyMiddleware, createStore } from 'redux'; 
import { createLogger } from "redux-logger";
import rpm from "redux-promise-middleware";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import indexReducer from "./reducers";

const persistConfig={
  key: "root",
  storage,
  whitelist:["authAPI"],
  blacklist:["products"]
}

const persistedReducer = persistReducer(persistConfig, indexReducer);

//MIDDLWARE
const logger=createLogger();
const enhancers=applyMiddleware(rpm,logger);

let store=createStore(persistedReducer, enhancers);
let persistor=persistStore(store);

export {store, persistor}