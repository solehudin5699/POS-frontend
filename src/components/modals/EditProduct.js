/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import styles from "../../styles/editproduct.module.css";
import {updateProductAPICreator} from "../../redux/actions/products"

export default function EditProduct(props) {
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const {isUpdatePending} = useSelector(state => state.products)
  const {product_id, product_name, product_price,  product_image, category_id} = props.detailProduct;
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category_id: "",
    img: "",
  });
  const handleUpdate=()=>{
    // props.onHide();
    let formData= new FormData();
    if(product.name){
      formData.append("product_name", product.name);
    } else{
      formData.append("product_name", props.detailProduct.product_name);
    }

    if(product.price){
      formData.append("product_price", product.price);
    } else{
      formData.append("product_price", Number(props.detailProduct.product_price));
    }

    if(product.category_id){
      formData.append("category_id", Number(product.category_id));
    } else{
      formData.append("category_id", Number(props.detailProduct.category_id));
    }

    if(product.img){
      formData.append("image", product.img);
      formData.append("imageDelete", props.detailProduct.product_image);
    } else{
      formData.append("product_image", props.detailProduct.product_image);
    }
    
    dispatch(updateProductAPICreator(Number(props.detailProduct.product_id), formData))
  }
  const handleChangeFile = (e) => {
    let files = e.target.files[0];
    setProduct({
      ...product,
      img: files,
    });
  };

  return (
    <>
    <input  onChange={(e) => handleChangeFile(e)} ref={inputRef} type='file' className={styles.hiddeninput}
        />
    <Modal
      {...props}
      onHide={()=>{setProduct({
        name: "",
        price: "",
        category_id: "",
        img: "",
      });
      props.onHide()
    }}
      style={{ zIndex: 1050, outline: "none" }}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className={styles.body}>
          <div className={styles.title}>
            <h5>Update Product</h5>
          </div>

          <div className={styles.lineImg}>
            <div className={styles.containerImg} 
            // onClick={() => {
            //       inputRef.current.click();
            //     }}
                >
              {props.show?(<img className={styles.img} src={product.img!==""?URL.createObjectURL(product.img) :product_image.split("")[0]==="/"? `${process.env.REACT_APP_API_URL}${product_image}`:product_image} alt="" />):null}
              <button style={{outline:"none"}}
                className={styles.btnedit} onClick={() => {
                  inputRef.current.click();
                }}>
                <i class="fa fa-camera" aria-hidden="true"></i> Change
                </button>
            </div>
          </div>

          <div className={styles.subtitle}>
            <h6>Name</h6>
          </div>
          <div className={styles.line}>
            <input defaultValue={props.show?product_name:null} onChange={(e)=>setProduct({...product, name:e.target.value})} className={styles.input} />
          </div>

          <div className={styles.subtitle}>
            <h6>Price</h6>
          </div>
          <div className={styles.line}>
            <input defaultValue={props.show?product_price:null} onChange={(e)=>setProduct({...product, price:e.target.value})} type="number" className={styles.input} />
          </div>

          <div className={styles.subtitle}>
            <h6>Category</h6>
          </div>
          <div className={styles.line}>
            <select defaultValue={props.show?category_id:null} className={styles.input} name='level_id' onChange={(e)=>setProduct({...product, category_id:e.target.value})}>
              <optgroup label='Category...'>
                <option value='1'>Khas Jawa Barat</option>
                <option value='2'>Khas Banten</option>
                </optgroup>
            </select>
          </div>


          <div className={styles.btncontainer} >
          <button
            onClick={() => {
              props.onHide()
            }}
            style={{
              outline: "none",
            }}
            className={styles.btncancelupdate}>
            Cancel 
          </button>
          <button
            onClick={() => {
              handleUpdate()
            }}
            style={{
              outline: "none",
            }}
            className={styles.btnupdate}>
            {isUpdatePending?(<i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>):"Update"} 
          </button>
          </div>
          
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
}
