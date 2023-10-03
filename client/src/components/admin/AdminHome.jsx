import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import Sidebar from '../../pages/admin/Sidebar'
import AdminDashboard from './AdminDashboard'
import BookingTrendChart from './BookingTrendChart'
import axios from 'axios'
import moment from 'moment'

export default function AdminHome() {
  const [hostels,setHostels]=useState([])
  const [users,setUsers]=useState([])
  const [bookings,setBookings]=useState([])

  const getBarChartData=async ()=>{
    try {
      const {data} = await axios.get('/admin/getBarChartData')
      setHostels(data.hostels)
      setUsers(data.users)
      setBookings(data.bookings)
      
      console.log('data',data);
      
    } catch (error) {
      console.error(error.message);
    }
  }

  
  useEffect(()=>{
    getBarChartData()
  },[])
  
  const totalRevenue = bookings.reduce((accumulator, booking) => {
    return accumulator + booking.amount;
  }, 0);
  
  const calculateMonthWiseTotal = () => {
    const monthWiseTotal = {};

    for (const booking of bookings) {
      console.log('booking.createdAt', booking.createdAt);
      const month = new Date(booking.createdAt).getMonth(); // Get the month (0-11)
      // const year = new Date(booking.createdAt).getFullYear(); // Get the year

      const monthYearKey = month; // Format: "YYYY-MM"
      
      if (monthWiseTotal[monthYearKey]) {
        monthWiseTotal[monthYearKey] += booking.amount;
      } else {
        monthWiseTotal[monthYearKey] = booking.amount;
      }
    }
    let monthlyData=[]
    for(let i=0; i<12; i++){
      monthlyData[i]= monthWiseTotal[i] ?? 0
    }

    return monthlyData;
  };


  console.log(calculateMonthWiseTotal())


  

  
  return (
    <>
    <AdminNavbar />
    <div className='d-flex'>
    <Sidebar className="sidebar"></Sidebar>
    <div className="d-flex flex-column w-100">

    <AdminDashboard></AdminDashboard>
    <BookingTrendChart calculateMonthWiseTotal={calculateMonthWiseTotal}/>
    </div>
    </div>
    {/* <DashboardLayout/> */}
    </>
  )
}
