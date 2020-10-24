import React from "react";
import {connect} from "react-redux";
import {
  validateTokenAPICreator
} from "../redux/actions/auth";



class Landing extends React.Component {



  // componentDidMount=()=>{
  //   this.props.validateToken();
  // }
  render() {
    // this.props.validateToken();
    return (
      <>
      
        <div>
          {this.props.validateToken()}
        <button onClick={()=>this.props.history.push("/home")}>Home</button>
        </div>
      {/* </div> */}
      </>
    );
  }
}
// export default Home;

const mapDispatchToProps = (dispacth) => {
  return {
    validateToken: () => {
      dispacth(validateTokenAPICreator());
    },
  };
};
export default connect(null, mapDispatchToProps)(Landing);