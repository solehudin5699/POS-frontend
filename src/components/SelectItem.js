/* eslint-disable */
//IMPORT LIBRARY
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
//IMPORT ACTIONS
import {
  cancelOrderCreator,
  deleteProductAPICreator,
  resetStatusCreator,
  deleteItemOrderCreator,
} from "../redux/actions/products";
import ConfirmDelete from "./modals/ConfirmDelete";
import EditProduct from "./modals/EditProduct";

// const notifyError = (msg) =>
//   toast.error(msg, {
//     position: "bottom-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// const notifySuccess = (msg) =>
//   toast.success(msg, {
//     position: "bottom-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });

export default function SelectItem(props) {
  const { productsOrdered, statusDelete, statusUpdate } = useSelector(
    (state) => state.products
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [itemDelete, setItemDelete] = useState({ id: "", img: "", name: "" });
  const [detailProduct, setDetailProduct] = useState({});
  const dispatch = useDispatch();
  const handleDelete = () => {
    let body = { imageDelete: itemDelete.img };
    dispatch(deleteProductAPICreator(Number(itemDelete.id), body));
  };
  useEffect(() => {
    if (statusDelete === 200) {
      dispatch(deleteItemOrderCreator(Number(itemDelete.id)));
      setDeleteModal(false);
      // notifySuccess("Success deleting product");
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    } else if (statusDelete === 500) {
      setDeleteModal(false);
      // notifyError("Failed deleting product");
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    }
  }, [statusDelete]);

  useEffect(() => {
    if (statusUpdate === 200) {
      dispatch(deleteItemOrderCreator(detailProduct.product_id));
      setEditModal(false);
      // notifySuccess("Success updating product");
      setTimeout(() => {
        // dispatch(deleteItemOrderCreator(detailProduct.product_id))
        dispatch(resetStatusCreator());
        // setEditModal(false)
      }, 3000);
    } else if (statusUpdate === 500) {
      setEditModal(false);
      // notifyError("Failed updating product");
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    }
  }, [statusUpdate]);
  // console.log({...detailProduct})
  return (
    <>
      <div className='sidebar'>
        <div className='aside-items'>
          <h5 className='detail-order' id='order'>
            Item Selected
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
                </div>
                <div className='col2Select'>
                  <h6>{item.product_name}</h6>

                  <table>
                    <tbody>
                      <tr>
                        <td style={{ backgroundColor: " #f24f8a" }}>
                          <button
                            style={{ outline: "none" }}
                            className='btn-num-order'
                            value={item.product_id}
                            onClick={() => {
                              setItemDelete({
                                id: item.product_id,
                                img: item.product_image,
                                name: item.product_name,
                              });
                              setDeleteModal(true);
                            }}>
                            Delete
                          </button>
                        </td>
                        <td style={{ backgroundColor: " #57cad5" }}>
                          <button
                            style={{ outline: "none" }}
                            className='btn-num-order'
                            value={index}
                            id='plus'
                            onClick={() => {
                              setEditModal(true);
                              setDetailProduct(item);
                            }}>
                            Update
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
        <div className='aside-bottom'>
          <button id='cancel' onClick={() => dispatch(cancelOrderCreator())}>
            Cancel
          </button>
        </div>
      </div>
      <ConfirmDelete
        name={itemDelete.name}
        handleDelete={handleDelete}
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
      />
      <EditProduct
        detailProduct={detailProduct}
        show={editModal}
        onHide={() => setEditModal(false)}
      />
    </>
  );
}
