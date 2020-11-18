/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import styles from "../../styles/checkout.module.css";
import {
  postOrderAPICreator,
  resetStatusCreator,
} from "../../redux/actions/products";
import { DateTime } from "luxon";

export default function CheckOutModal(props) {
  const dispatch = useDispatch();
  const {
    productsOrdered,
    totalPrice,
    isPostPending,
    statusPost,
  } = useSelector((state) => state.products);
  const { dataLogin } = useSelector((state) => state.authAPI);
  const dateNow = DateTime.local().toISODate();
  let invoices = `${dateNow.split("-")[0]}${dateNow.split("-")[1]}${
    dateNow.split("-")[2]
  }${Math.random().toFixed(3).split(".")[1]}`;
  const handlePostOrder = () => {
    let products = productsOrdered.map((item) => {
      return item.product_name;
    });
    let quality = productsOrdered.map((item) => {
      return item.numOrder;
    });
    let total = Number(totalPrice) + 0.1 * Number(totalPrice);

    let body = {
      user: dataLogin.user_id,
      product_order: `${products}`,
      quality_order: `${quality}`,
      total_price: total,
      invoices,
    };
    dispatch(postOrderAPICreator(body));
  };
  useEffect(() => {
    if (statusPost === 200) {
      props.onHide();
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    } else if (statusPost === 500) {
      props.onHide();
      dispatch(resetStatusCreator());
    }
  }, [dispatch, props, statusPost]);
  return (
    <Modal
      {...props}
      style={{ zIndex: 1050, outline: "none" }}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className={styles.body}>
          <div
            className={styles.line}
            style={{  marginBottom: "25px" }}>
            <h6 className={styles.checkouttext}> </h6>
            <div
              style={{ cursor: "pointer" }}
              className={styles.checkouttext}
              onClick={() => props.onHide()}>
              <i className='fa fa-times' aria-hidden='true'></i>{" "}
            </div>
          </div>
          <div className={styles.line}>
            <h6 className={styles.checkouttext}>Checkout</h6>
            <h6 className={styles.receipttext}>Receipt no : #{invoices} </h6>
          </div>
          <div className={styles.line}>
            <h6 className={styles.cashiertext}>Cashier : {dataLogin.name}</h6>
          </div>

          {productsOrdered.map((item, index) => {
            return (
              <div key={index.toString()} className={styles.line}>
                <p className={styles.itemOrderText}>
                  {item.product_name} {item.numOrder}x
                </p>
                <p className={styles.itemOrderText}>Rp{item.product_price}</p>
              </div>
            );
          })}

          <div className={styles.line}>
            <p className={styles.itemOrderText}>PPN 10%</p>
            <p className={styles.itemOrderText}>Rp{0.1 * Number(totalPrice)}</p>
          </div>
          <div className={styles.lineTotal}>
            <h6 className={styles.itemOrderText}>
              Total : Rp{0.1 * Number(totalPrice) + Number(totalPrice)}
            </h6>
          </div>
          <div className={styles.line}>
            <h6 className={styles.itemOrderText}>Payment : Cash</h6>
          </div>

          <div className={styles.btncontainer}>
            <button
              onClick={() => {
                handlePostOrder();
              }}
              style={{
                outline: "none",
              }}
              className={styles.btnPrint}>
              {isPostPending ? (
                <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
              ) : (
                "Print"
              )}
            </button>
            <div
              className={styles.line}
              style={{ alignItems: "center", justifyContent: "center" }}>
              <div className={styles.itemOrderText}>Or</div>
            </div>
            <button
              onClick={() => {
                // props.handleDelete()
              }}
              style={{
                outline: "none",
              }}
              className={styles.btnSendEmail}>
              Send Email
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
