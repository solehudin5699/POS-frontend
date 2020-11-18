import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateTokenAPICreator } from "../redux/actions/auth";
import HeaderHistory from "../components/HeaderHistory";
import Navbar from "../components/Navbar";
import MainHistory from "../components/MainHistory";
import BottomNav from "../components/BottomNav";

export default function History (props){
  const [isShow, handleShow] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateTokenAPICreator());
  }, [dispatch]);
  const handleHideShow = () => {
    handleShow(!isShow);
  };

  return (
    <>
      <div className='app'>
        <HeaderHistory hideShowFunction={() => handleHideShow()} />
        <div className='wrapper-history'>
          {isShow ? <Navbar/> : null}
          <MainHistory isShow={isShow} />
        </div>
      </div>
      <BottomNav/>
    </>
  );
  // }
};


