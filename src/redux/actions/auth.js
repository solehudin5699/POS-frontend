import { createAsyncAction } from "redux-promise-middleware-actions";
// import axios from "axios";
import {loginAPI, registrationAPI, validateTokenAPI} from "../../utils/requestAuth"

export const loginAPICreator = createAsyncAction(
  "LOGIN",
  async (body) => {
    const res = await loginAPI(body);
    return res.data;
  }
);

export const registrationAPICreator = createAsyncAction(
  "REGISTRATION",
  async (body, header) => {
    const res = await registrationAPI(body, header);
    return res.data;
  }
);
export const validateTokenAPICreator = createAsyncAction(
  "VALIDATE",
  async () => {
    const res = await validateTokenAPI();
    return res.data;
  }
);
export const logoutCreator = (event) => {
  return {
    type: "LOGOUT"
  };
};