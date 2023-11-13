import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function AdminPieChart(props) {
   
     const series1= props.hostelTypeArray
      const options1= {
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

    const capacity = props.capacity;
    const occupants = props.occupants;

    // Calculate occupancy percentage
    const occupancyPercentage = (occupants / capacity) * 100;
    const remainingCapacityPercentage = 100 - occupancyPercentage;
     const series2= [occupancyPercentage, remainingCapacityPercentage]
      const options2= {
        chart: {
          type: 'donut',
        },
        labels: ['Occupancy', 'Remaining Capacity'],
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
      <>
      <MDBRow>
        <MDBCol>
        <div id="chart" style={{width:'500px'}} className=''>
        <ReactApexChart key={1} options={options1} series={series1} type="donut" />
        <h5 className='ms-4'>Registered Hostels</h5>
      </div>
        </MDBCol>
        <MDBCol>
        <div id="chart" style={{width:'525px'}} className=''>
        <ReactApexChart key={2} options={options2} series={series2} type="donut" />
        <h5 className='ms-4'>Capacity & occupants</h5>
      </div>
        </MDBCol>
      </MDBRow>
    {/* <div className="d-flex mb-5">

      <div id="chart" style={{width:'500px'}} className=''>
        <ReactApexChart key={1} options={options1} series={series1} type="donut" />
        <h5 className='ms-4'>Registered Hostels</h5>
      </div>
      <div id="chart" style={{width:'525px'}} className=''>
        <ReactApexChart key={2} options={options2} series={series2} type="donut" />
        <h5 className='ms-4'>Capacity & occupants</h5>
      </div>
    </div> */}
      </>
    );
  }
  

