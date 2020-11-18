import React, { useEffect,createRef } from "react";
import Chart from "chart.js";
import { useSelector } from "react-redux";
import classes from "../styles/LineGraph.module.css";
// Chart.defaults.global.legend.display = false;
Chart.defaults.global.legend.labels.usePointStyle = true;
// Chart.defaults.global.elements.point = false;
Chart.defaults.global.elements.line.tension = 0.3;

// class LineGraph extends React.Component {
const LineGraph = () => {
  const { dataGetOrder, isGetOrderPending, statusGetOrder } = useSelector(
    (state) => state.products
  );

  const chartRef = createRef();
  useEffect(() => {
    if (statusGetOrder === 200 && !isGetOrderPending) {
      let currentMonth = new Date().toISOString().split("-")[1];
      let currentYear = new Date().toISOString().split("-")[0];
      let dateNow = new Date().toISOString().substring(8, 10);
      let currentDates = new Date(
        currentYear,
        currentMonth - 1,
        Number(dateNow) + 1
      ).toISOString();
      let endDates = new Date(currentYear, currentMonth).toISOString();
      let startDates = new Date(
        currentMonth === 1 ? currentYear - 1 : currentYear,
        currentMonth === 1 ? 12 : currentMonth - 1
      ).toISOString();
      let diffDays =
        (new Date(endDates.substring(0, 10)) -
          new Date(startDates.substring(0, 10))) /
        (1000 * 60 * 60 * 24);
      let diffCurrentStart =
        (new Date(currentDates.substring(0, 10)) -
          new Date(startDates.substring(0, 10))) /
        (1000 * 60 * 60 * 24);
      let labelChart = [];
      for (let i = 0; i < diffDays; i++) {
        labelChart[i] = new Date(currentYear, currentMonth - 1, i + 2)
          .toISOString()
          .substring(0, 10);
      }

      let dataChart = dataGetOrder.filter(
        (item) => item.order_date > startDates && item.order_date <= endDates
      );

      let tempData = [];
      for (let i = 0; i < diffCurrentStart; i++) {
        if (
          dataChart.find(
            (item) => item.order_date.substring(0, 10) === labelChart[i]
          )
        ) {
          tempData[i] = dataChart
            .filter(
              (item) => item.order_date.substring(0, 10) === labelChart[i]
            )
            .map((item) => item.total_price)
            .reduce((total, value) => total + value);
        } else {
          tempData[i] = 0;
        }
      }
      dataChart = tempData;
      console.log(diffDays);
      console.log(dataChart);
      console.log(labelChart);
      const chartReference = chartRef.current.getContext("2d");
      new Chart(chartReference, {
        type: "line",
        data: {
          labels: labelChart,
          datasets: [
            {
              label: "This Month",
              data: dataChart,
              backgroundColor: "#00F1FF",
              fill: false,
              borderColor: "#00F1FF",
            },
          ],
        },
        options: {
          // tooltips: {
          //   enabled: true,
          //   mode: "label",
          //   callbacks: {
          //     labels: function (item) {
          //       return `${item.yLabel}`;
          //     },
          //   },
          // },
          //Customize chart options
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 5,
              // left: 15,
              // right: 15,
              bottom: 15,
            },
          },
          legend: {
            position: "bottom",
            borderRadius: "10px",
          },
          scales: {
            xAxes: [
              {
                ticks: { display: false },
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  display: true,
                  beginAtZero: true,
                  callback: function (value, index, values) {
                    return value / 1000 + "k";
                  },
                },
                gridLines: {
                  display: true,
                  drawBorder: false,
                },
              },
            ],
          },
        },
      });
    }
  }, [statusGetOrder, isGetOrderPending, dataGetOrder, chartRef]);
  return (
    <>
      <div className={classes.graphContainer}>
        <h6 style={{ fontWeight: "bold" }}>Revenue</h6>
        <canvas id='chartRef' ref={chartRef} />
      </div>
    </>
  );
  // }
};

export default LineGraph;
