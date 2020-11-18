/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import styles from "../../styles/confirmdelete.module.css";

export default function ConfirmDelete(props) {
  const {isDeletePending} = useSelector(state => state.products)
  return (
    <Modal
      {...props}
      style={{ zIndex: 1050, outline: "none" }}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className={styles.body}>
          <div className={styles.title}>
            <h5>Delete Product</h5>
          </div>
          <h6 style={{marginTop:"15px"}} >Are you sure to delete <span style={{color:"#f24f8a", fontSize: "1.3em" ,fontWeight:"900"}}>{props.name}</span>  from Food Items ?</h6>
          <div className={styles.btncontainer} >
          <button
            onClick={() => {
              props.onHide()
            }}
            style={{
              outline: "none",
            }}
            className={styles.btncancel}>
            Cancel 
          </button>
          <button
            onClick={() => {
              props.handleDelete()
            }}
            style={{
              outline: "none",
            }}
            className={styles.btndelete}>
            {isDeletePending?(<i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>):"Delete"} 
          </button>
          </div>
          
        </div>
      </Modal.Body>
    </Modal>
  );
}
