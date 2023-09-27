import axios from "axios";
import {
  MDBBadge,
  MDBCard,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState({
    hostelCount: 0,
    userCount: 0,
    bookingCount: 0,
    activeBookingsCount:0
  });
  const fetchData = async () => {
    const response = await axios.get(`/admin/data`);
    const hostelCount = response.data.hostelCount;
    const userCount = response.data.userCount;
    const bookingCount = response.data.bookingCount;
    const activeBookingsCount = response.data.activeBookingsCount;
    console.log("data in dashboard", hostelCount);
    setData({ ...data, hostelCount: hostelCount, userCount, bookingCount,activeBookingsCount });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex p-4">
      <MDBRow>
        <MDBCol sm="6" md='6' lg='3'>
          <MDBCard
            className="shadow-lg p-3 m-3 d-flex justify-content-center align-items-center"
            style={{ width: "180px", height: "130px" }}
          >
            <MDBCardTitle>Total Hostels</MDBCardTitle>
            <h3 className="mt-2 d-flex justify-content-center">
              <MDBBadge className="">{data.hostelCount}</MDBBadge>
            </h3>
          </MDBCard>
        </MDBCol>
        <MDBCol sm="6" md='6' lg='3'>
          <MDBCard
            className="shadow-lg p-3 m-3 d-flex justify-content-center align-items-center"
            style={{ width: "180px", height: "130px" }}
          >
            <MDBCardTitle>Total Users</MDBCardTitle>
            <h3 className="mt-2 d-flex justify-content-center">
              <MDBBadge className="">{data.userCount}</MDBBadge>
            </h3>
          </MDBCard>
        </MDBCol>
        <MDBCol sm="6" md='6' lg='3'>
          <MDBCard
            className="shadow-lg p-3 m-3 d-flex justify-content-center align-items-center"
            style={{ width: "180px", height: "130px" }}
          >
            <MDBCardTitle>Total Bookings</MDBCardTitle>
            <h3 className="mt-2 d-flex justify-content-center">
              <MDBBadge className="">{data.bookingCount}</MDBBadge>
            </h3>
          </MDBCard>
        </MDBCol>
        <MDBCol sm="6" md='6' lg='3'>
          <MDBCard
            className="shadow-lg p-3 m-3 d-flex justify-content-center align-items-center"
            style={{ width: "180px", height: "130px" }}
          >
            <MDBCardTitle>Active Booking</MDBCardTitle>
            <h3 className="mt-2 d-flex justify-content-center">
              <MDBBadge className="">{data.activeBookingsCount}</MDBBadge>
            </h3>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    
    </div>
  );
}
