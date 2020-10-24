//IMPORT LIBRARY
import React from "react";
import {connect} from "react-redux";
//IMPORT ACTIONS
import {cancelOrderCreator, changeQuantityCreator} from "../redux/actions/products";

class OrderItem extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="aside-items">
          <h5 className="detail-order" id="order">Detail Order</h5>
          {this.props.products.productsOrdered.map((item, index) => {
            return (
              <div key={index} id="item">
                <div id="col1">
                  <img src={item.product_image} alt="" />
                </div>
                <div id="col2">
                  <h6>{item.product_name}</h6>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <button
                            className="btn-num-order"
                            value={index}
                            id="min"
                            onClick={(e)=>this.props.changeQuantity(e)}
                          >
                            -
                          </button>
                        </td>
                        <td>
                          {item.numOrder}
                        </td>
                        <td>
                          <button
                            className="btn-num-order"
                            value={index}
                            id="plus"
                            onClick={(e)=>this.props.changeQuantity(e)}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="col3">
                  Rp. {this.props.products.productsOrdered[index].product_price}
                </div>
              </div>
            );
          })}
        </div>
        <div className="aside-bottom">
          <div id="total-item">
            <div id="total">
              <h6>Total</h6>
              <p>*Belum termasuk PPN</p>
            </div>
            <div id="total-value">
              <h6>Rp. {this.props.products.totalPrice}*</h6>
            </div>
          </div>
          <button id="checkout" onClick={this.props.handleCheckOut}>
            Checkout
          </button>
          <button id="cancel" onClick={()=>this.props.cancelOrder()}>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  const {products} = state;
  return{products}
}
const mapDispatchToProps=(dispatch)=>{
  return{
    changeQuantity:(event)=>{
      dispatch(changeQuantityCreator(event))
    },
    cancelOrder:()=>{
      dispatch(cancelOrderCreator())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
