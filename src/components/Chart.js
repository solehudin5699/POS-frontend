import React, { useEffect } from "react";
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

  const chartRef = React.createRef();
  useEffect(() => {
    if (statusGetOrder === 200 && !isGetOrderPending) {
      let currentMonth = new Date().toISOString().split("-")[1];
      let currentYear = new Date().toISOString().split("-")[0];
      let endDates = new Date(currentYear, currentMonth).toISOString();
      let startDates = new Date(
        currentMonth === 1 ? currentYear - 1 : currentYear,
        currentMonth === 1 ? 12 : currentMonth - 1
      ).toISOString();
      let diffDays =
        (new Date(endDates.substring(0, 10)) -
          new Date(startDates.substring(0, 10))) /
        (1000 * 60 * 60 * 24);
      let labelChart = [];
      for (let i = 0; i < diffDays; i++) {
        labelChart[i] = new Date(currentYear, currentMonth - 1, i + 2)
          .toISOString()
          .substring(0, 10);
      }
      let xAxis = dataGetOrder.filter(
        (item) => item.order_date > startDates && item.order_date <= endDates
      );
      // .map((item) => item.order_date.substring(0, 10));
      let tempLabel = xAxis[0].order_date.substring(0, 10);
      for (let i = 1; i < xAxis.length; i++) {
        if (
          xAxis[i - 1].order_date.substring(0, 10) !==
          xAxis[i].order_date.substring(0, 10)
        ) {
          tempLabel += "," + xAxis[i].order_date.substring(0, 10);
        }
      }
      xAxis = tempLabel.split(",");
      // console.log(tempLabel);
      let dataChart = dataGetOrder.filter(
        (item) => item.order_date > startDates && item.order_date <= endDates
      );
      // .map((item) => item.total_price);

      let tempData = [];
      for (let i = 0; i < xAxis.length; i++) {
        tempData[i] = dataChart
          .filter((item) => item.order_date.substring(0, 10) == xAxis[i])
          .map((item) => item.total_price)
          .reduce((total, value) => total + value);
      }
      dataChart = tempData;
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
            // {
            //   label: "National Average",
            //   data: this.props.datasecond,
            //   backgroundColor: "#FFB8C6",
            //   fill: false,
            //   borderColor: "#FFB8C6",
            // },
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
  }, [statusGetOrder, isGetOrderPending]);
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
