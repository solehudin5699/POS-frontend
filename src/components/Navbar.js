import React from "react";
//IMPORT IMAGE
import fork from "../assets/image/fork.png";
import clipboard from "../assets/image/clipboard.png";
import add from "../assets/image/add.png";
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
    <div className="navbar" style={{textAlign:"center"}}>
      <Link to="/"><img src={fork} alt="" /></Link>
      <Link to="/history" ><img src={clipboard} alt="" /></Link>
      <img src={add} alt="" onClick={this.props.handleAddModal} />
    </div>
    );
  }
}

export default Navbar;
