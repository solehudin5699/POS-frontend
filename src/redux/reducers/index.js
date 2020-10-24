import { combineReducers } from "redux";
import productsReducer from "./products";
import requestProductsReducer from "./requestProducts";
import authAPIReducer from "./auth";
//Combine reducers
const indexReducer=combineReducers({
  products:productsReducer,
  requestAPIProducts:requestProductsReducer,
  authAPI:authAPIReducer
})

export default indexReducer;