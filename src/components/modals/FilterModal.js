/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import styles from "../../styles/filtermodal.module.css";
import { filterCreator } from "../../redux/actions/filter";

export default function FilterModal(props) {
  const {price, time, category} = useSelector(state => state.filter)
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({price, time, category})
  const handleSave=()=>{
    props.onHide();
    dispatch(filterCreator(filter.time, filter.price,filter.category))
  }
  console.log(filter)
  return (
    <Modal
      {...props}
      // size=''
      onHide={()=>{props.onHide(); setFilter({price, time, category})}}
      style={{ zIndex: 1050, outline: "none" }}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className={styles.body}>
          <h5 style={{textAlign:"center", width:"100%", color:"#57cad5", fontWeight: "500"}}>Filter</h5>
          <div className={styles.title}>
            <h6>Price</h6>
          </div>
          <div className={styles.line}>
            <button
              onClick={() => {
                setFilter({...filter,price:"DESC"})
              }}
              style={{ outline: "none" }}
              className={filter.price==="DESC"?styles.btnselect:styles.btnunselect}>
              Expensive
            </button>
            <button
              onClick={() => {
                setFilter({...filter,price:"ASC"})
              }}
              style={{ outline: "none" }}
              className={filter.price==="ASC"?styles.btnselect:styles.btnunselect}>
              Cheapest
            </button>
          </div>

          <div className={styles.title}>
            <h6>Dates</h6>
          </div>
          <div className={styles.line}>
            <button
              onClick={() => {
                setFilter({...filter,time:"DESC"})
              }}
              style={{ outline: "none" }}
              className={filter.time==="DESC"?styles.btnselect:styles.btnunselect}>
              Newest
            </button>
            <button
              onClick={() => {
                setFilter({...filter,time:"ASC"})
              }}
              style={{ outline: "none" }}
              className={filter.time==="ASC"?styles.btnselect:styles.btnunselect}>
              Oldest
            </button>
          </div>

          <div className={styles.title}>
            <h6>Category</h6>
          </div>
          <div className={styles.line}>
            <select className={styles.select} name='level_id' defaultValue={category}
            onChange={(e) => {
              let value= e.target.value
              setFilter({...filter,category:value})
            }}
            >
              <optgroup label='Select category...'>
                <option value='0'>All category</option>
                <option value='1'>Jabar Food</option>
                <option value='2'>Banten Food</option>
              </optgroup>
            </select>
          </div>

          <button
            onClick={() => {
              handleSave()
            }}
            style={{
              alignSelf: "flex-end",
              marginTop: "20px",
              outline: "none",
            }}
            className={styles.btnsave}>
            Save
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
