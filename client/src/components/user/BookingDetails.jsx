import axios from "axios";
import {
  MDBBtn,
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
import mySwal from "../../utils/sweetalert";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function BookingDetails() {
  const { user } = useSelector((state) => state.auth.user);
  const [bookingData, setBookingData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getBookings = async () => {
    try {
      const { data } = await axios.get("/user/bookings/" + user._id);
      const bookings = data.bookings;
      console.log("user room bookings in profile comp", bookings);
      setBookingData(bookings);
      console.log(bookingData);
    } catch (error) {
      console.log(error);
    }
  };

  let curDate = new Date();
  const handleCancel = async (id) => {
    const { isConfirmed } = await mySwal.confirm("You want to cancel?");
    if (!isConfirmed) return;
    setIsLoading(true);
    try {
      console.log("date in profile comp", curDate, id);
      const response = await axios.get("/user/booking/cancel/" + id);
      const cancelledBooking = await response.data.cancelledBooking;
      console.log("success", cancelledBooking);
      setIsLoading(false);
      setRefresh(!refresh);
      toast.success('Succefully cancelled')
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBookings();
  }, [refresh]);

  return (
    <>
      <section className="container pb-5">
        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardHeader>
                <h4>Booking Details</h4>
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
                        <th>Valid till</th>
                        <th>Action</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {bookingData.map((item) => (
                        <tr key={item._id}>
                          <td>{item.hostelId.hostelName}</td>
                          <td>{item.roomId.title}</td>
                          <td>{item.amount}</td>
                          <td>{moment(item.checkIn).format("DD-MM-YYYY")}</td>
                          <td>
                            <p className="fw-normal mb-1">
                              {moment(item.checkIn)
                                .add(1, "M")
                                .format("DD-MM-YYYY")}
                            </p>
                          </td>
                          <td>
                            {item.status === "active" ? (
                              <MDBBtn
                                disabled={
                                  curDate <= item.checkIn || isLoading === true
                                }
                                onClick={() => handleCancel(item._id)}
                              >
                                <ClipLoader
                                  loading={isLoading}
                                  color="white"
                                  size={15}
                                ></ClipLoader>
                                Cancel
                              </MDBBtn>
                            ) : item.status === "cancelled" ? (
                              <span>cancelled</span>
                            ) : (
                              "expired"
                            )}
                          </td>
                          {/* <td>{user?.hostelData?.hostelId.hostelName}</td>
                        <td>{user?.hostelData?.roomId.title}</td>
                        <td>{user?.hostelData?.roomId.room_rent}</td>
                      <td>{user?.hostelData?.roomId.createdAt}</td> */}
                        </tr>
                      ))}

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
