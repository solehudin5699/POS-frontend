import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrderAPICreator } from "../redux/actions/products";

const RecentOrder = () => {
  const convertDates = (time) => {
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dates = time.substring(0, 10).split("-");
    return `${dates[2]} ${month[Number(dates[1]) - 1]} ${dates[0]}`;
  };
  function formatRupiah(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const { dataGetOrder } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrderAPICreator());
  }, []);
  return (
    <div className='row'>
      <div
        className='col info-table'
        style={{
          margin: "10px 15px",
          paddingLeft: "40px",
          paddingBottom: "40px",
        }}>
        <h6 style={{ fontWeight: "bold" }}>Recent Order</h6>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th style={{ width: "15%" }}>INVOICES</th>
              <th style={{ width: "15%" }}>CASHIER</th>
              <th style={{ width: "15%" }}>DATE</th>
              <th style={{ width: "40%" }}>ORDERS</th>
              <th style={{ width: "15%" }}>AMOUNT</th>
            </tr>
            {dataGetOrder.map((item, index) => {
              return (
                <tr
                  key={index.toString()}
                  style={{
                    verticalAlign: "top",
                    borderBottom: "1px",
                    borderBottomColor: "black",
                  }}>
                  <td>
                    #
                    {item.order_date.substring(0, 8).split("-").join("") +
                      item.order_id}
                  </td>
                  <td>{item.name}</td>
                  <td>{convertDates(item.order_date)}</td>
                  <td>{item.product_order}</td>
                  <td>Rp{formatRupiah(item.total_price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrder;
