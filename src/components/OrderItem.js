//IMPORT LIBRARY
import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
//IMPORT ACTIONS
import {
  cancelOrderCreator,
  changeQuantityCreator,
  deleteItemOrderCreator,
} from "../redux/actions/products";
import CheckOutModal from "./modals/CheckOutModal";

export default function OrderItem(props) {
  const { productsOrdered, totalPrice } = useSelector(
    (state) => state.products
  );
  const [checkout, setCheckout] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className='sidebar'>
      <div className='aside-items'>
        <h5 className='detail-order' id='order'>
          Detail Order
        </h5>
        {productsOrdered.map((item, index) => {
          return (
            <div key={index} id='item'>
              <div id='col1'>
                <img
                  src={
                    item.product_image.split("")[0] === "/"
                      ? `${process.env.REACT_APP_API_URL}${item.product_image}`
                      : item.product_image
                  }
                  alt=''
                />
                <button
                  style={{ Zindex: 1 }}
                  value={item.product_id}
                  className='btn btn-danger'
                  onClick={() => {
                    dispatch(deleteItemOrderCreator(item.product_id))
                    }}>
                  <i className='fa fa-trash-o fa-lg'></i>
                </button>
              </div>
              <div id='col2'>
                <h6>{item.product_name}</h6>

                <table>
                  <tbody>
                    <tr>
                      <td>
                        <button
                          style={{ outline: "none" }}
                          className='btn-num-order'
                          value={index}
                          id='min'
                          onClick={(e) => dispatch(changeQuantityCreator(e))}>
                          -
                        </button>
                      </td>
                      <td>{item.numOrder}</td>
                      <td>
                        <button
                          style={{ outline: "none" }}
                          className='btn-num-order'
                          value={index}
                          id='plus'
                          onClick={(e) => dispatch(changeQuantityCreator(e))}>
                          +
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id='col3'>Rp. {productsOrdered[index].product_price}</div>
            </div>
          );
        })}
      </div>
      <div className='aside-bottom'>
        <div id='total-item'>
          <div id='total'>
            <h6>Total</h6>
            <p>*Belum termasuk PPN</p>
          </div>
          <div id='total-value'>
            <h6>Rp. {totalPrice}*</h6>
          </div>
        </div>
        <button id='checkout' onClick={()=>setCheckout(true)}>
          Checkout
        </button>
        <button id='cancel' onClick={() => dispatch(cancelOrderCreator())}>
          Cancel
        </button>
      </div>
      <CheckOutModal show={checkout} onHide={()=>setCheckout(false)} />
    </div>
  );
}
