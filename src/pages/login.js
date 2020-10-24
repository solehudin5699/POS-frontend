import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAPICreator } from "../redux/actions/auth";

import classes from "./login.module.css";

const Login = (props) => {
  const [formData, updateFormData] = useState({});
  const [login, setLogin] = useState(false);
  const { tokenStatus } = useSelector((state) => state.authAPI);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    updateFormData({
      ...formData,level_id:1,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin(true);
  };

  useEffect(() => {
    if (login) {
      dispatch(loginAPICreator(formData));
      setLogin(false);
    }
  }, [login, formData, dispatch]);
  // console.log(formData);

  return (
    <>
      {tokenStatus.token ? (
        <Switch>
          <Redirect from='/login' to='/' exact />
        </Switch>
      ) : (
        <div className={classes.container}>
          <div className={classes.boxlogin}>
            <div className={classes.header}>
              <h1>Login</h1>
            </div>
            <form className={classes.boxlogin}
              onSubmit={(e) => {
                return handleSubmit(e);
              }}>
              <div className={classes.line}>
                <div className={classes.label}>Name</div>
                <div className={classes.input}>
                  <input className={classes.input} type='text'name='username' onChange={(e) => {return handleChange(e);}}/>
                </div>
              </div>
              <div className={classes.line}>
                <div className={classes.label}>Password</div>
                <div className={classes.input}>
                  <input className={classes.input} type='password'name='password' onChange={(e) => {return handleChange(e);}}/>
                </div>
              </div>
              <div className={classes.line}>
                <div className={classes.labelselect}>
                  <select className={classes.select} name="level_id" onChange={(e)=>{return handleChange(e)}} >
                    <optgroup label="Login as..." >
                      <option value="1" >Admin</option>
                      <option value="2">Cashier</option>
                    </optgroup>
                  </select>
                </div>
                <div className={classes.inputbtn}>
                  <button className={classes.button} type='submit'>Login</button>
                </div>
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
