import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import Drawer from '@material-ui/core/Drawer';
import ConfirmDelete from "./modals/ConfirmDelete";
import EditProduct from "./modals/EditProduct";
import {
  cancelOrderCreator,
  deleteProductAPICreator,
  resetStatusCreator,
  deleteItemOrderCreator,
} from "../redux/actions/products";
import styles from "../styles/selectdrawer.module.css";
import iconFoodRest from "../assets/image/food-and-restaurant.png"

const EmptyItem=()=>{
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100vw", flexDirection:"column", marginTop:"35vw"}} >
      <img src={iconFoodRest} alt="No items selected" style={{width:"50vw"}} />
      <h6>No items selected</h6>
    </div>
  )
}

export default function SelectDrawer(props) {
  const {open, setOpen} = props;
  const { productsOrdered, statusDelete, statusUpdate } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [itemDelete, setItemDelete] = useState({ id: "", img: "", name: "" });
  const [detailProduct, setDetailProduct] = useState({});
  const handleDelete = () => {
    let body = { imageDelete: itemDelete.img };
    dispatch(deleteProductAPICreator(Number(itemDelete.id), body));
  };

  useEffect(() => {
    if (statusDelete === 200) {
      dispatch(deleteItemOrderCreator(Number(itemDelete.id)));
      setDeleteModal(false);
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    } else if (statusDelete === 500) {
      setDeleteModal(false);
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    }
  }, [dispatch, itemDelete.id, statusDelete]);

  useEffect(() => {
    if (statusUpdate === 200) {
      dispatch(deleteItemOrderCreator(detailProduct.product_id));
      setEditModal(false);
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    } else if (statusUpdate === 500) {
      setEditModal(false);
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    }
  }, [detailProduct.product_id, dispatch, statusUpdate]);
  return (
    <div>
      <Drawer style={{zIndex:20}} anchor="right" open={open} onClose={()=>setOpen(false)} onOpen={()=>setOpen(true)}>
      <div className={styles.container}
      role="presentation"
      onKeyDown={()=>setOpen(false)}>
        {/* <div style={{alignSelf:"flex-start", justifySelf:"flex-start", width:"100vw", textAlign:"center"}}>
        <h6  >Product selected</h6>
        </div> */}
        
        {productsOrdered.length===0?(<EmptyItem/>):(
          <div className={styles.content} >
          {productsOrdered.map((item, index) => {
              return (
                <div key={index} className={styles.item}>
                  <div className={styles.col1}>
                    <img className={styles.col1Img}
                      src={
                        item.product_image.split("")[0] === "/"
                          ? `${process.env.REACT_APP_API_URL}${item.product_image}`
                          : item.product_image
                      }
                      alt=''
                    />
                  </div>
                  <div className={styles.col2Select}>
                    <h6>{item.product_name}</h6>
  
                    <table className={styles.col2Select_table}>
                      <tbody>
                        <tr>
                          <td className={styles.col2Select_td} style={{ backgroundColor:"#f24f8a" }}>
                            <button className={styles.col2Select_button}
                              style={{ outline: "none" }}
                              // className='btn-num-order'
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
                          <td style={{ backgroundColor: " #57cad5" }} className={styles.col2Select_td}>
                            <button className={styles.col2Select_button}
                              style={{ outline: "none" }}
                              // className='btn-num-order'
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
        )}
        
        <div className={styles.bottom}>
          {productsOrdered.length?(<button className={styles.btnCancel} onClick={() => dispatch(cancelOrderCreator())}>
            Cancel
          </button>):null}
          
        </div>
      </div>
      </Drawer>
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
    </div>
  )
}
