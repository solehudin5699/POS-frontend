import { combineReducers } from "redux";
import productsReducer from "./products";
import authAPIReducer from "./auth";
import filterReducer from "./filter"
//Combine reducers
const indexReducer=combineReducers({
  products:productsReducer,
  authAPI:authAPIReducer,
  filter : filterReducer
})

export default indexReducer;