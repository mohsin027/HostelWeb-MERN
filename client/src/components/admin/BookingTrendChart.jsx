import React, { useState } from "react";
import Chart from "react-apexcharts";

const BookingTrendChart = (props) => {
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },

  }

  const series = [
    {
      name: "series-1",
      data: props.calculateMonthWiseTotal()
    }
  ]

  return (
    <div className="m-5">
      <div className="row">
        <h4>Revenue Table</h4>
        <div className="mixed-chart" >
        <Chart
            options={options}
            series={series}
            type="bar"
            width={"100%"} 
            height={400} 
          />
        </div>
      </div>
    </div>
  );
};

export default BookingTrendChart;
