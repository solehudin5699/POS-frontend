/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Drawer from '@material-ui/core/Drawer';
import {
  cancelOrderCreator,
  deleteItemOrderCreator, changeQuantityCreator
} from "../redux/actions/products";
import styles from "../styles/cartdrawer.module.css";
import iconFoodRest from "../assets/image/food-and-restaurant.png";
import CheckOutModal from "./modals/CheckOutModal";

const EmptyItem=()=>{
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100vw", flexDirection:"column", marginTop:"25vh"}} >
      <img src={iconFoodRest} alt="No items selected" style={{width:"50vw"}} />
      <h5>Your Cart is Empty </h5>
      <p> Please add some items from the menu </p>
    </div>
  )
}

export default function SelectDrawer(props) {
  const {open, setOpen} = props;
  const { productsOrdered, totalPrice } = useSelector(
    (state) => state.products
  );
  const [checkout, setCheckout] = useState(false);
  const dispatch = useDispatch();
  return (
    <div>
      <Drawer style={{zIndex:20}} anchor="right" open={open} onClose={()=>setOpen(false)} onOpen={()=>setOpen(true)}>
      <div className={styles.container}
      role="presentation"
      onKeyDown={()=>setOpen(false)}>
        {/* <div style={{alignSelf:"flex-start", justifySelf:"flex-start", width:"100vw", textAlign:"center"}}>
        <h6  >Product selected</h6>
        </div> */}
        {!productsOrdered.length?(<EmptyItem/>):(
          <div className={styles.content} >
            {productsOrdered.map((item, index) => {
              return (
                <div key={index} className={styles.item}>
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
                      <i className='fa fa-trash fa-lg'></i>
                    </button>
                  </div>
                  <div id='col2'>
                    <h6>{item.product_name}</h6>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <button style={{ outline: "none" }} className='btn-num-order'
                              value={index} id='min' onClick={(e) => dispatch(changeQuantityCreator(e))}>
                              -
                            </button>
                          </td>
                          <td>{item.numOrder}</td>
                          <td>
                            <button style={{ outline: "none" }} className='btn-num-order' value={index} id='plus' onClick={(e) => dispatch(changeQuantityCreator(e))}>
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
        )}
      
        <div className={styles.bottom}>
          {productsOrdered.length?(
          <>
          <div className={styles.totalItem}>
            <div className={styles.total}>
              <h6 style={{fontSize:"15px"}} >Total</h6>
              <p>*Belum termasuk PPN</p>
            </div>
            <div className={styles.totalValue}>
              <h6 style={{fontSize:"15px"}}>Rp. {totalPrice}*</h6>
            </div>
          </div>
          <button style={{ outline: "none" }} className={styles.btnCheckout} onClick={()=>setCheckout(true)} >
            Checkout
          </button>
          <button style={{ outline: "none" }} className={styles.btnCancel} onClick={() => dispatch(cancelOrderCreator())}>
            Cancel
          </button>
          </>
          ):null}
          
        </div>
      </div>
      </Drawer>
      <CheckOutModal show={checkout} onHide={()=>setCheckout(false)} />
    </div>
  )
}
