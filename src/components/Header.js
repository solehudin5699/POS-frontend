/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/icons/list.svg";
import search from "../assets/icons/search.svg";
import filter from "../assets/image/filter.png";
import {
  getProductsAPICreator,
  resetProductCreator,
  keywordCreator,
} from "../redux/actions/products";

export default function Header(props) {
  const { price, time, category } = useSelector((state) => state.filter);
  const { productsOrdered, keyword } = useSelector((state) => state.products);
  const { dataLogin } = useSelector((state) => state.authAPI);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    let target = event.target;
    let value = target.value;
    dispatch(keywordCreator(value));
    // setKeyword(value);
    let categoryId;
    if (Number(category) === 0) {
      categoryId = "";
    } else {
      categoryId = category;
    }
    if (event.key === "Enter") {
      dispatch(keywordCreator(value));
      dispatch(resetProductCreator());
      dispatch(getProductsAPICreator(value, price, time, categoryId, 1));
      props.setPage(1);
    }
  };
  const handleClickSearch = () => {
    let categoryId;
    if (Number(category) === 0) {
      categoryId = "";
    } else {
      categoryId = category;
    }
    if (keyword) {
      dispatch(resetProductCreator());
      dispatch(getProductsAPICreator(keyword, price, time, categoryId, 1));
      props.setPage(1);
    }
  };
  return (
    <>
      <header>
        <div className='hamburger-menu' onClick={props.hideShowFunction}>
          <img src={logo} alt='' />
        </div>
        <div className='search'>
          <input
            style={{ outline: "none" }}
            id='input'
            placeholder='Food Items'
            type='search'
            onChange={(e) => handleSearch(e)}
            onKeyPress={(e) => handleSearch(e)}
          />
          <div className='searchFilter'>
            <label htmlFor='input' onClick={() => handleClickSearch()}>
              <img src={search} alt=''></img>
            </label>
            <div className='filter' onClick={() => props.onHide()}>
              <img src={filter} alt='' className='filter'></img>
            </div>
          </div>
        </div>
        <div className='title-cart'>
          {dataLogin.level_id === 1 ? (
            <h6 className='selected'>
              Selected{" "}
              <span className='quantity'>{productsOrdered.length}</span>
            </h6>
          ) : (
            <>
              <h6 className='carttext'>
                Cart <span className='quantity'>{productsOrdered.length}</span>
              </h6>
              <h6 className='carticon'>
                <i className='fa fa-shopping-cart fa-lg' aria-hidden='true'></i>
                <span className='quantity'>{productsOrdered.length}</span>
              </h6>
            </>
          )}
        </div>
      </header>
    </>
  );
}
