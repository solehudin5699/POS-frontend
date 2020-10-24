import React from "react";
import {connect} from "react-redux";
import logo from "../assets/icons/list.svg";
import search from "../assets/icons/search.svg";
import {
  getProductsAPICreator,
} from "../redux/actions/products";
// import { Mcontext } from "./MyProvider";

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state={
      keyword:""
    }
  }

  handleSearch=(event)=>{
    let target=event.target;
    let value=target.value;
    this.setState({keyword:value})
    if(event.key==="Enter"){
      this.props.getProduct(value);
    }else{
      this.props.getProduct(value);
    }
  }
  handleClickSearch=()=>{
    this.props.getProduct(this.state.keyword)
  }
  // static contextType = Mcontext;
  render() {
    return (
      <header>
        <div className='hamburger-menu' onClick={this.props.hideShowFunction}>
          <img src={logo} alt='' />
        </div>
        <div className='search'>
          <input
            id='input'
            placeholder='Food Items'
            type='search'
            onChange={(e)=>this.handleSearch(e)}
            onKeyPress={(e)=>this.handleSearch(e)}
          />
          <label htmlFor='input' onClick={()=>this.handleClickSearch()}>
            <img src={search} alt=''></img>
          </label>
        </div>
        <div className='title-cart'>
          {/* <a href='#order'> */}
            <h6>
              Cart{" "}
              <span className='quantity'>
                {this.props.products.productsOrdered.length}
              </span>
            </h6>
          {/* </a> */}
        </div>
      </header>
    );
  }
}

const mapStateToProps=(state)=>{
  const {products}=state;
  return{ products }
}
const mapDispatchToProps = (dispacth) => {
  return {
    getProduct: (keyword) => {
      dispacth(
        getProductsAPICreator(keyword)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
