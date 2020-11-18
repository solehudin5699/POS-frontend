import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrderAPICreator } from "../redux/actions/products";

const startOfTheMonth = DateTime.local().startOf("month").toISODate();
const startOfTheLastMonth = DateTime.local()
  .minus({ month: 1 })
  .startOf("month")
  .toISODate();

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
  }, [dispatch]);

  const [period, setPeriod] = useState("this_month");
  const [thismonth, setThismonth] = useState([]);
  const [lastmonth, setLastmonth] = useState([]);
  const handlePeriod = (e) => {
    setPeriod(e.target.value);
  };
  useEffect(() => {
    if (dataGetOrder.length > 0) {
      let thismonthdata = dataGetOrder.filter((item) => {
        return (
          DateTime.fromISO(item.order_date.split("T")[0]).toISODate() >=
          startOfTheMonth
        );
      });
      let lastmonthdata = dataGetOrder.filter((item) => {
        return (
          DateTime.fromISO(item.order_date.split("T")[0]).toISODate() >=
            startOfTheLastMonth &&
          DateTime.fromISO(item.order_date.split("T")[0]).toISODate() <
            startOfTheMonth
        );
      });
      setThismonth(thismonthdata);
      setLastmonth(lastmonthdata);
    }
  }, [dataGetOrder]);
  return (
    <div className='row'>
      <div
        className='col info-table'
        style={{
          margin: "10px 15px",
          paddingLeft: "40px",
          paddingBottom: "40px",
          overflowX: "scroll",
        }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <h6 style={{ fontWeight: "bold", fontSize: "15px" }}>Recent Order</h6>
          <select
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.15)",
              border: "none",
              outline: "none",
              fontSize: "13px",
            }}
            onChange={(e) => handlePeriod(e)}>
            <option value='this_month'>This month</option>
            <option value='last_month'>Last month</option>
          </select>
        </div>
        <table style={{ width: "100%", fontSize: "12px" }}>
          <tbody>
            <tr>
              <th style={{ width: "15%", fontSize: "15px" }}>Invoices</th>
              <th style={{ width: "15%", fontSize: "15px" }}>Cashier</th>
              <th style={{ width: "15%", fontSize: "15px" }}>Date</th>
              <th style={{ width: "40%", fontSize: "15px" }}>Orders</th>
              <th style={{ width: "15%", fontSize: "15px" }}>Amount</th>
            </tr>
            {(period === "this_month" ? thismonth : lastmonth).map(
              (item, index) => {
                return (
                  <tr
                    key={index.toString()}
                    style={{
                      verticalAlign: "top",
                      borderBottom: "1px",
                      borderBottomColor: "black",
                    }}>
                    <td>
                      {item.invoices
                        ? item.invoices
                        : item.order_date.substring(0, 8).split("-").join("") +
                          item.order_id}
                    </td>
                    <td>{item.name}</td>
                    <td>{convertDates(item.order_date)}</td>
                    <td>{item.product_order}</td>
                    <td>Rp{formatRupiah(item.total_price)}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrder;
