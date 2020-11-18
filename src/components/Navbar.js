import React, {useState} from "react";
import fork from "../assets/image/fork.png";
import clipboard from "../assets/image/clipboard.png";
import userIconMenu from "../assets/image/usericonmenu.png";
import AddModal from "./modals/AddModal";
import AddProduct from "./modals/AddProduct"
import AddUser from "./modals/AddUser"
import { Link } from "react-router-dom";


export default function Navbar (props) {
  const [addModal, setAddModal] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [addUser, setAddUser] = useState(false)

    return (
      <>
      <div className='navbar' style={{ textAlign: "center" }}>
        <Link style={{ outline: "none" }} to='/'>
          <img style={{ outline: "none" }} src={fork} alt='' />
        </Link>
        <Link style={{ outline: "none" }} to='/history' from="history" >
          <img style={{ outline: "none" }} src={clipboard} alt='' />
        </Link>
        <img
          style={{ outline: "none" }}
          src={userIconMenu}
          alt=''
          onClick={()=>setAddModal(true)}
        />
      </div>
      <AddModal onHide={()=>setAddModal(false)} show={addModal} addProduct={()=>setAddProduct(true)} addUser={()=>setAddUser(true)} />
      <AddProduct onHide={()=>setAddProduct(false)} show={addProduct} />
      <AddUser onHide={()=>setAddUser(false)} show={addUser} />
      </>
  );
}

