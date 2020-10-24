import React from "react";
import { connect } from "react-redux";
import {
  postOrderAPICreator,
  toastPostOrderCreator,
} from "../../redux/actions/products";

class CheckOut extends React.Component {
  handlePostOrder = () => {
    let products = this.props.products.productsOrdered.map((item) => {
      return item.product_name;
    });
    let quality = this.props.products.productsOrdered.map((item) => {
      return item.numOrder;
    });
    let total =
      Number(this.props.products.totalPrice) +
      0.1 * Number(this.props.products.totalPrice);
    let body = {
      user: Number(localStorage.getItem("user_id")),
      product_order: `${products}`,
      quality_order: `${quality}`,
      total_price: total,
    };
    this.props.postOrder(body);
    setTimeout(this.props.cancelToastPostOrder, 5000);
  };
  render() {
    return (
      <div className='modal'>
        <div className='content-wrapper'>
          <div className='modal-content'>
            <button
              onClick={this.props.handleCheckOut}
              type='button'
              className='close text-right'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
            <div className='row'></div>
            <div className='row'></div>
            <div className='row'>
              <div className='col'>Checkout</div>
              <div className='col'>Receipt no:#010410919</div>
            </div>
            <div className='row row-cashier'>
              <div className='col col-cashier'>Cashier : {localStorage.getItem("name")}</div>
              <div className='col'></div>
            </div>
            {this.props.products.productsOrdered.map((item, index) => {
              return (
                <div key={index.toString()} className='row'>
                  <div className='col'>
                    {item.product_name} {item.numOrder}x
                  </div>
                  <div className='col'>Rp.{item.product_price} </div>
                </div>
              );
            })}
            <div className='row'>
              <div className='col'>Ppn 10%</div>
              <div className='col'>
                Rp.{0.1 * Number(this.props.products.totalPrice)}{" "}
              </div>
            </div>
            <div className='row'>
              <div className='col'></div>
              <div className='col'>
                Total: Rp.
                {0.1 * Number(this.props.products.totalPrice) +
                  Number(this.props.products.totalPrice)}{" "}
              </div>
            </div>
            <div className='row'>
              <div className='col'>Payment: Cash</div>
              <div className='col'></div>
            </div>
            <button
              type='submit'
              id='print'
              className='btn button-print'
              onClick={() => {
                this.props.handleCheckOut();
                return this.handlePostOrder();
              }}>
              Print
            </button>

            <h6 className='row-or'>Or</h6>
            <button id='send-email' className='button-send-email'>
              Send Email
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state;
  return { products };
};
const mapDispatchToProps = (dispacth) => {
  return {
    postOrder: (body) => {
      dispacth(postOrderAPICreator(body));
    },
    cancelToastPostOrder: () => {
      dispacth(toastPostOrderCreator());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
