import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateTokenAPICreator } from "../redux/actions/auth";
import HeaderHistory from "../components/HeaderHistory";
import Navbar from "../components/Navbar";
import MainHistory from "../components/MainHistory";
import AddData from "../components/modals/AddData";
import Add from "../components/modals/Add";
import AddUser from "../components/modals/AddUser";

const History = (props) => {
  const [isShow, handleShow] = useState(true);
  const [isShowAddDataModal, setAddDataModal] = useState(false);
  const [isAddUser, setAddUser] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateTokenAPICreator());
  }, [dispatch]);
  const handleHideShow = () => {
    handleShow(!isShow);
  };
  const handleAddModal = () => {
    setAdd(!isAdd);
  };

  const handleAddUserModal = () => {
    setAdd(false);
    setAddUser(!isAddUser);
  };
  const handleAddDataModal = () => {
    setAdd(false);
    setAddDataModal(!isShowAddDataModal);
  };
  return (
    <>
      <div className='app'>
        <HeaderHistory hideShowFunction={() => handleHideShow()} />
        <div className='wrapper-history'>
          {isShow ? <Navbar handleAddModal={() => handleAddModal()} /> : null}
          <MainHistory isShow={isShow} />
        </div>
        {isShowAddDataModal ? (
          <AddData handleAddDataModal={() => handleAddDataModal()} />
        ) : null}

        {isAddUser ? <AddUser handleAddUserModal={handleAddUserModal} /> : null}
        {isAdd ? (
          <Add
            handleAddUserModal={handleAddUserModal}
            handleAddDataModal={handleAddDataModal}
            handleAddModal={() => handleAddModal()}
          />
        ) : null}
      </div>
    </>
  );
  // }
};

export default History;
