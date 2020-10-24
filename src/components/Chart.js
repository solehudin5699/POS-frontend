import React from "react";
import Chart from "chart.js";
import classes from "../styles/LineGraph.module.css";
// Chart.defaults.global.legend.display = false;
Chart.defaults.global.legend.labels.usePointStyle = true;
// Chart.defaults.global.elements.point = false;
Chart.defaults.global.elements.line.tension = 0.3;

class LineGraph extends React.Component {
  chartRef = React.createRef();
  componentDidMount() {
    const chartRef = this.chartRef.current.getContext("2d");
    new Chart(chartRef, {
      type: "line",
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: "This Month",
            data: this.props.datafirst,
            backgroundColor: "#00F1FF",
            fill: false,
            borderColor: "#00F1FF",
          },
          {
            label: "National Average",
            data: this.props.datasecond,
            backgroundColor: "#FFB8C6",
            fill: false,
            borderColor: "#FFB8C6",
          },
        ],
      },
      options: {
        // tooltips: {
        //   enabled: true,
        //   mode: "label",
        //   callbacks: {
        //     labels: (item) => {
        //       `${item.yLabel}k`;
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
  render() {
    return (
      <>
        <div className={classes.graphContainer}>
          <h6 style={{fontWeight:"bold"}}>Revenue</h6>
          <canvas id='chartRef' ref={this.chartRef} />
        </div>
      </>
    );
  }
}

export default LineGraph;
