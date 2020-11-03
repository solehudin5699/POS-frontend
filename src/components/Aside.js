import React from "react";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import foodrestaurant from "../assets/image/food-and-restaurant.png";

class Aside extends React.Component {
  render() {
    return (
      <div>
        {this.props.products.productsOrdered.length ? (
          <OrderItem handleCheckOut={this.props.handleCheckOut} />
        ) : (
          <aside className='sidebar'>
            <img src={foodrestaurant} alt='' />
            <h3>Your Cart is Empty </h3>
            <p> Please add some items from the menu </p>
          </aside>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state;
  return { products };
};
export default connect(mapStateToProps)(Aside);
