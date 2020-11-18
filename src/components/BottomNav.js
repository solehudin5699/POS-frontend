import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/bottomnav.module.css";
import fork from "../assets/image/fork.png";
import clipboard from "../assets/image/clipboard.png";
import userIconMenu from "../assets/image/usericonmenu.png";
import selectIcon from "../assets/image/selecticon.png";
import cart from "../assets/image/cart.png";
import AddModal from "./modals/AddModal";
import AddProduct from "./modals/AddProduct";
import AddUser from "./modals/AddUser";
import { useHistory } from "react-router-dom";
import SelectDrawer from "./SelectDrawer";
import CartDrawer from "./CartDrawer";

export default function BottomNav(props) {
  const { productsOrdered } = useSelector((state) => state.products);
  const { dataLogin } = useSelector((state) => state.authAPI);
  const route = useHistory();
  const [addModal, setAddModal] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  return (
    <div className={styles.container}>
      <div
        className={
          pathname === "/" && !(open || openCart)
            ? styles.menu
            : styles.menuUnselect
        }
        onClick={() => {
          setPathname("/");
          route.push("/");
          setOpen(false);
          setOpenCart(false);
        }}>
        <img
          className={styles.iconmenu}
          style={{ outline: "none" }}
          src={fork}
          alt=''
        />
      </div>
      <div
        className={
          pathname === "/history" && !(open || openCart)
            ? styles.menu
            : styles.menuUnselect
        }
        onClick={() => {
          setPathname("/history");
          route.push("/history");
          setOpen(false);
          setOpenCart(false);
        }}>
        <img
          className={styles.iconmenu}
          style={{ outline: "none" }}
          src={clipboard}
          alt=''
        />
      </div>
      <div
        className={open || openCart ? styles.menu : styles.menuUnselect}
        style={{ position: "relative" }}
        onClick={() => {
          if (dataLogin.level_id === 1) {
            setOpen(!open);
            !open
              ? setPathname("drawer")
              : setPathname(window.location.pathname);
          } else {
            setOpenCart(!openCart);
            !openCart
              ? setPathname("drawer")
              : setPathname(window.location.pathname);
          }
        }}>
        <img
          className={styles.iconmenu}
          style={{ outline: "none" }}
          src={dataLogin.level_id === 1 ? selectIcon : cart}
          alt=''
        />
        <span className={styles.quantity}>{productsOrdered.length}</span>
      </div>
      <div className={styles.menuUser}>
        <img
          className={styles.iconmenu}
          style={{ outline: "none" }}
          src={userIconMenu}
          alt=''
          onClick={() => {
            setAddModal(true);
          }}
        />
      </div>
      <AddModal
        onHide={() => setAddModal(false)}
        show={addModal}
        addProduct={() => setAddProduct(true)}
        addUser={() => setAddUser(true)}
      />
      <AddProduct onHide={() => setAddProduct(false)} show={addProduct} />
      <AddUser onHide={() => setAddUser(false)} show={addUser} />
      <SelectDrawer open={open} setOpen={setOpen} />
      <CartDrawer open={openCart} setOpen={setOpenCart} />
    </div>
  );
}
