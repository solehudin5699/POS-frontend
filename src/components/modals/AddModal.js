/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import styles from "../../styles/addmodal.module.css";
import user from "../../assets/image/user.png";
import { logoutCreator } from "../../redux/actions/auth";
import { cancelOrderCreator } from "../../redux/actions/products";

export default function AddModal(props) {
  const {dataLogin} = useSelector(state => state.authAPI);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutCreator());
    dispatch(cancelOrderCreator());
    props.onHide();
  };
  return (
    <Modal
      {...props}
      style={{ zIndex: 1050, outline: "none" }}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className={styles.body}>
          <div className={styles.line}>
            <img src={user} style={{ width: "30%", borderRadius: "10%" }} alt='' />
          </div>
          <div className={styles.line}>
            <h5 style={{marginTop:"15px"}} >{dataLogin.name}</h5>
          </div>
          {dataLogin.level_id===1?(<div className={styles.line} style={{justifyContent:"space-evenly", marginTop:"30px"}} >
            <button
              onClick={() => {
                props.onHide();
                props.addUser();
              }}
              style={{
                outline: "none",
              }}
              className={styles.btnadduser}>
              Add User 
            </button>
            <button
              onClick={() => {
                props.onHide();
                props.addProduct();
              }}
              style={{
                outline: "none",
              }}
              className={styles.btnaddproduct}>
              Add Product
            </button>
          </div>):null}
          
          <div className={styles.line} style={{marginTop:"30px"}} >
            <button
              onClick={() => {
                handleLogout();
              }}
              style={{
                outline: "none",
              }}
              className={styles.btnlogout}>
              Logout 
            </button>
          </div>
          
          
        </div>
      </Modal.Body>
    </Modal>
  );
}
