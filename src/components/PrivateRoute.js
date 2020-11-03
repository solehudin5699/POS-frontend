import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { validateTokenAPICreator } from "../redux/actions/auth";
class PrivateRoute extends React.Component {
  render() {
    // this.props.validateToken();
    const { component: Component, authAPI, ...rest } = this.props;
    console.log(this.props);
    return (
      <Route
        {...rest}
        render={(props) => {
          if (authAPI.tokenStatus.token && authAPI.statusLogin === 200) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: props.location,
                }}
              />
            );
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { authAPI } = state;
  return {
    authAPI,
  };
};
const mapDispatchToProps = (dispacth) => {
  return {
    validateToken: () => {
      dispacth(validateTokenAPICreator());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
