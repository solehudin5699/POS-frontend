import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAPICreator } from "../redux/actions/auth";

import classes from "./login.module.css";

const Login = (props) => {
  const [formData, updateFormData] = useState({});
  const [login, setLogin] = useState(false);
  const { tokenStatus, isLoginPending, statusLogin } = useSelector(
    (state) => state.authAPI
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      level_id: 1,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAPICreator(formData));
    // setLogin(true);
  };
  return (
    <>
      {statusLogin === 200 && tokenStatus.token ? (
        <Switch>
          <Redirect from='/login' to='/' exact />
        </Switch>
      ) : (
        <div className={classes.container}>
          <div className={classes.boxlogin}>
            <div className={classes.header}>
              <h1
                style={{
                  color: "#f56438",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}>
                L O G I N
              </h1>
              {statusLogin === 500 ? (
                <p style={{ color: "red" }}>Username or password is wrong</p>
              ) : null}
            </div>
            <form
              className={classes.contentlogin}
              onSubmit={(e) => {
                handleSubmit(e);
              }}>
              <div className={classes.line}>
                <div className={classes.label}>Username</div>
                <div>
                  <input
                    className={classes.input}
                    type='text'
                    name='username'
                    onChange={(e) => {
                      return handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className={classes.line}>
                <div className={classes.label}>Password</div>
                <div>
                  <input
                    className={classes.input}
                    type='password'
                    name='password'
                    onChange={(e) => {
                      return handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className={classes.line}>
                <div className={classes.labelselect}>Login as</div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}>
                  <select
                    className={classes.select}
                    name='level_id'
                    onChange={(e) => {
                      return handleChange(e);
                    }}>
                    <optgroup label='Login as...'>
                      <option value='1'>Admin</option>
                      <option value='2'>Cashier</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className={classes.linebtn}>
                {/* <div className={classes.inputbtn}> */}
                <button
                  style={{ outline: "none" }}
                  className={classes.button}
                  type='submit'>
                  {isLoginPending ? (
                    <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                  ) : (
                    "Login"
                  )}
                </button>
                {/* </div> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
  // }
};
export default Login;
// const mapStateToProps = (state) => {
//   const { authAPI } = state;
//   return { authAPI };
// };
// const mapDispatchToProps = (dispacth) => {
//   return {
//     login: (body) => {
//       dispacth(loginAPICreator(body));
//     },
//     validate: () => {
//       dispacth(validateTokenAPICreator());
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
