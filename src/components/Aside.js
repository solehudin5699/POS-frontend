import React from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import SelectItem from "./SelectItem";
import foodrestaurant from "../assets/image/food-and-restaurant.png";

export default function Aside(props) {
  const { dataLogin } = useSelector((state) => state.authAPI);
  const { productsOrdered } = useSelector((state) => state.products);
  return (
    <div>
      {productsOrdered.length ? (
        dataLogin.level_id === 1 ? (
          <SelectItem />
        ) : (
          <OrderItem/>
        )
      ) : (
        <aside className='sidebar'>
          <img src={foodrestaurant} alt='' />
          {dataLogin.level_id === 1 ? (
            <h5>No items selected </h5>
          ) : (
            <h5>Your Cart is Empty </h5>
          )}
          {dataLogin.level_id === 1 ? null : (
            <p> Please add some items from the menu </p>
          )}
        </aside>
      )}
    </div>
  );
}
