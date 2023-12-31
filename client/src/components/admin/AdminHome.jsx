import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "../../pages/admin/Sidebar";
import AdminDashboard from "./AdminDashboard";
import BookingTrendChart from "./BookingTrendChart";
import axios from "axios";
import moment from "moment";
import AdminPieChart from "./AdminPieChart";

export default function AdminHome() {
  const [hostels, setHostels] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [capacity, setCapacity] = useState([]);
  const [occupants, setOccupants] = useState([]);

  const getBarChartData = async () => {
    try {
      const { data } = await axios.get("/admin/getBarChartData");
      setHostels(data.hostels);
      setUsers(data.users);
      setBookings(data.bookings);
      setCapacity(data.roomCapacity[0].totalCapacity);
      setOccupants(data.roomOccupancy[0].totalOccupants);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getBarChartData();
  }, []);

  const mensHostels = hostels.filter(
    (item) => item.hostelType === "men"
  ).length;
  const womensHostels = hostels.filter(
    (item) => item.hostelType === "women"
  ).length;
  const hostelTypeArray = [mensHostels, womensHostels];

  const totalRevenue = bookings.reduce((accumulator, booking) => {
    return accumulator + booking.amount;
  }, 0);

  const calculateMonthWiseTotal = () => {
    const monthWiseTotal = {};

    for (const booking of bookings) {
      const month = new Date(booking.createdAt).getMonth();
      // const year = new Date(booking.createdAt).getFullYear();
      const monthYearKey = month;
      if (monthWiseTotal[monthYearKey]) {
        monthWiseTotal[monthYearKey] += booking.amount;
      } else {
        monthWiseTotal[monthYearKey] = booking.amount;
      }
    }
    let monthlyData = [];
    for (let i = 0; i < 12; i++) {
      monthlyData[i] = monthWiseTotal[i] ?? 0;
    }
    return monthlyData;
  };

  return (
    <>
      <AdminNavbar />
      <div className="d-flex">
        <Sidebar className="sidebar"></Sidebar>
        <div className="d-flex flex-column w-100">
          <AdminDashboard></AdminDashboard>
          <BookingTrendChart
            calculateMonthWiseTotal={calculateMonthWiseTotal}
          />
          <AdminPieChart
            hostelTypeArray={hostelTypeArray}
            occupants={occupants}
            capacity={capacity}
          ></AdminPieChart>
        </div>
      </div>
      {/* <DashboardLayout/> */}
    </>
  );
}
