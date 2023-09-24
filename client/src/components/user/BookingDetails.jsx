import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTabsItem,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

export default function BookingDetails() {
  const { user } = useSelector((state) => state.auth.user);
  const [bookingData,setBookingData]=useState([])

  const getBookings =async()=>{
    try {
      const {data}=await axios.get('/user/bookings/'+user._id)
      const bookings=data.bookings
    console.log('user room bookings in profile comp',bookings);
    setBookingData(bookings)
    console.log(bookingData);
    } catch (error) {
      console.log(error);
    }
  }
let d=new Date(Date.now());
console.log('date in profile comp',d); 
useEffect(()=>{
  getBookings()
},[])

  return (
    <>
      <section className="container">
        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardHeader>
                <h4>Booking Details</h4>
                <p>
                {bookingData[0]?.hostelName}
                  
                </p>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText>
                  <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th>Hostel Name</th>
                            <th>Room Name</th>
                            <th>Amount</th>
                            <th>Check In</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                          bookingData.map((item) =>
                      <tr>
                        <td>{item.hostelId.hostelName}</td>
                        <td>{item.roomId.title}</td>
                        <td>{item.amount}</td>
                        <td>{moment(item.checkIn).format('DD-MM-YYYY')}</td>
                        {/* <td>{user?.hostelData?.hostelId.hostelName}</td>
                        <td>{user?.hostelData?.roomId.title}</td>
                        <td>{user?.hostelData?.roomId.room_rent}</td>
                      <td>{user?.hostelData?.roomId.createdAt}</td> */}
                      </tr>
                   )
                  }

                      <MDBTabsItem></MDBTabsItem>
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </>
  );
}
