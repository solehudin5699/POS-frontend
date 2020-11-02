import {
  loginAPICreator,
  registrationAPICreator,
  validateTokenAPICreator,
} from "../actions/auth";

const initialCart = {
  dataLogin: {},
  errorLogin: undefined,
  statusLogin: null,
  isLoginPending: false,
  isLoginFulFilled: false,
  isLoginRejected: false,

  dataRegist: [],
  errorRegist: undefined,
  isRegistPending: false,
  isRegistFulFilled: false,
  isRegistRejected: false,

  tokenStatus: {},
  errorValidate: undefined,
  isValidatePending: false,
  isValidateFulFilled: false,
  isValidateRejected: false,
};

const authAPIReducer = (prevState = initialCart, action) => {
  switch (action.type) {
    case String(loginAPICreator.pending):
      return {
        ...prevState,
        isLoginPending: true,
      };
    case String(loginAPICreator.fulfilled):
      let datalogin;
      let status;
      let statLog;
      if (Number(action.payload.status) === 200) {
        statLog = 200;
        localStorage.setItem("name", action.payload.data.name);
        localStorage.setItem("user_id", action.payload.data.user_id);
        localStorage.setItem("level_id", action.payload.data.level_id);
        localStorage.setItem("token", action.payload.data.token);
        datalogin = action.payload.data;
        status = true;
      } else {
        status = false;
        statLog = 500;
      }

      return {
        ...prevState,
        statusLogin: statLog,
        dataLogin: datalogin,
        errorLogin: undefined,
        isLoginPending: false,
        isLoginFulFilled: true,
        isLoginRejected: false,
        tokenStatus: { ...prevState.tokenStatus, token: status },
      };
    case String(loginAPICreator.rejected):
      return {
        ...prevState,
        statusLogin: 500,
        errorLogin: action.payload,
        isLoginRejected: true,
        isLoginPending: false,
        isLoginFulFilled: false,
      };

    case String(registrationAPICreator.pending):
      return {
        ...prevState,
        isRegistPending: true,
      };
    case String(registrationAPICreator.fulfilled):
      return {
        ...prevState,
        dataRegist: action.payload.data,
        errorRegist: undefined,
        isRegistPending: false,
        isRegistFulFilled: true,
        isRegistRejected: false,
      };
    case String(registrationAPICreator.rejected):
      return {
        ...prevState,
        errorRegist: action.payload,
        isRegistRejected: true,
        isRegistPending: false,
        isRegistFulFilled: false,
      };

    case String(validateTokenAPICreator.pending):
      return {
        ...prevState,
        isValidatePending: true,
      };
    case String(validateTokenAPICreator.fulfilled): {
      let dataValidate;
      if (Number(action.payload.status) === 200) {
        dataValidate = action.payload;
        // dataValidate = action.payload;
      } else {
        dataValidate = { token: false };
        // dataValidate = { token: false };
      }
      return {
        ...prevState,
        tokenStatus: dataValidate,
        errorValidate: undefined,
        isValidatePending: false,
        isValidateFulFilled: true,
        isValidateRejected: false,
      };
    }
    case String(validateTokenAPICreator.rejected):
      return {
        ...prevState,
        errorValidate: action.payload,
        isValidateRejected: true,
        isValidatePending: false,
        isValidateFulFilled: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...prevState,
        dataLogin: [],
        errorLogin: undefined,
        isLoginPending: false,
        isLoginFulFilled: false,
        isLoginRejected: false,
        tokenStatus: false,
        statusLogin: null,
      };
    default:
      return prevState;
  }
};

export default authAPIReducer;
