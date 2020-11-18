/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import styles from "../../styles/addproduct.module.css";
import { toast } from "react-toastify";
import {
  addProductsAPICreator,
  resetStatusCreator,
} from "../../redux/actions/products";

export default function AddProduct(props) {
  const { statusAdd, isAddPending } = useSelector((state) => state.products);
  const { time, price, category } = useSelector((state) => state.filter);
  const [name, setName] = useState("");
  const [priceProduct, setPrice] = useState("");
  const [image, setImage] = useState();
  const [categoryProduct, setCategory] = useState(1);
  const dispatch = useDispatch();

  const handleChangeFile = (e) => {
    const content = e.target.files[0];
    setImage(content);
  };
  const handleChangeName = (e) => {
    const content = e.target.value;
    setName(content);
  };
  const handleChangePrice = (e) => {
    const content = e.target.value;
    setPrice(content);
  };
  const handleChangeCategory = (e) => {
    const content = e.target.value;
    setCategory(content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", priceProduct);
    formData.append("image", image);
    formData.append("category_id", categoryProduct);
    dispatch(addProductsAPICreator(formData));
  };
  const notifyError = () =>
    toast.error("Failed add product", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifySuccess = () =>
    toast.success("Success add product", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    if (statusAdd === 200) {
      // notifySuccess();
      props.onHide();
      // let categoryId;
      // if (Number(category) === 0) {
      //   categoryId = "";
      // } else {
      //   categoryId = category;
      // }
      // dispatch(resetProductCreator());
      // dispatch(getProductsAPICreator("", price, time, categoryId, 1));
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    } else if (statusAdd === 500) {
      // notifyError();
      props.onHide();
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    }
  }, [statusAdd]);
  return (
    <Modal
      {...props}
      style={{ zIndex: 1050, outline: "none" }}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className={styles.body}>
          <div className={styles.line}>
            <h5 style={{ marginTop: "15px" }}>Add Product</h5>
          </div>
          <div className={styles.line}>
            <div className={styles.label}>
              <p className={styles.textlabel} style={{ alignSelf: "center" }}>
                Name
              </p>
            </div>
            <div className={styles.contentinput}>
              <input
                className={styles.input}
                type='text'
                onChange={(e) => {
                  handleChangeName(e);
                }}
                required
              />
            </div>
          </div>

          <div className={styles.line}>
            <div className={styles.label}>
              <p className={styles.textlabel} style={{ alignSelf: "center" }}>
                Image
              </p>
            </div>
            <div className={styles.contentinput}>
              <input
                className={styles.input}
                type='file'
                name='image'
                onChange={(e) => {
                  handleChangeFile(e);
                }}
                required
              />
            </div>
          </div>

          <div className={styles.line}>
            <div className={styles.label}>
              <p className={styles.textlabel}>Price</p>
            </div>
            <div className={styles.contentinput}>
              <input
                className={styles.input}
                type='number'
                name='price'
                onChange={(e) => {
                  handleChangePrice(e);
                }}
                required
              />
            </div>
          </div>

          <div className={styles.line}>
            <div className={styles.label}>
              <p className={styles.textlabel}>Category</p>
            </div>
            <div className={styles.contentinput}>
              <select
                name='category'
                placeholder='Category'
                className={styles.input}
                onChange={(e) => {
                  handleChangeCategory(e);
                }}
                required>
                <optgroup label='Category'>
                  <option value='1' selected>
                    Khas Jawa Barat
                  </option>
                  <option value='2'>Khas Banten</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div className={styles.containerbtn} style={{ marginTop: "30px" }}>
            <button
              onClick={() => {
                props.onHide();
              }}
              style={{
                outline: "none",
              }}
              className={styles.btncancel}>
              Cancel
            </button>
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              style={{
                outline: "none",
              }}
              className={styles.btnaddproduct}>
              {isAddPending ? (
                <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
