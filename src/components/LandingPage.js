import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {
  validateTokenAPICreator
} from "../redux/actions/auth";
class LandingPage extends React.Component
{

  componentDidMount=()=>{
    this.props.validateToken();
  }
  render(){
    // this.props.validateToken();
    const { component:Component,authAPI,...rest } = this.props;
    console.log(this.props)
    return(
    <Route
    {...rest}
    render={
      
      (props)=>{
        // this.props.validateToken();
      
        return <Redirect to={
          {
            pathname:"/home",
            state:props.location
          }
        }/>

        // if(authAPI.tokenStatus){
        //   return <Redirect to={
        //     {
        //       pathname:"/home",
        //       state:props.location
        //     }
        //   }/>
        // } else {
        //   return <Redirect to={
        //     {
        //       pathname:"/login",
        //       state:props.location
        //     }
        //   }/>
        // }
      }
    }
    />
  )
};}

const mapStateToProps = (state) =>{
  const {authAPI} = state;
  return{
    authAPI
  }
}
const mapDispatchToProps = (dispacth) => {
  return {
    validateToken: () => {
      dispacth(validateTokenAPICreator());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);