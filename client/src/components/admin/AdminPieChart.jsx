import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function AdminPieChart(props) {
   
     const series= props.hostelTypeArray
      const options= {
        chart: {
          type: 'donut',
        },
        labels: ["Gents Hostel", "Ladies Hostel"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      }
  

    
  
    return (
    <div className="d-flex">

      <div id="chart" className='w-50'>
        <ReactApexChart options={options} series={series} type="donut" />
      </div>
      {/* <div id="chart" className='w-50'>
        <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
      </div> */}
    </div>
    );
  }
  

