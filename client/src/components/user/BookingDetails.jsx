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
import { Pagination } from "@mui/material";

export default function BookingDetails() {
  const { user } = useSelector((state) => state.auth.user);
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  const getBookings = async () => {
    try {
      // const { data } = await axios.get("/user/bookings/" + user._id);
      const response = await axios.get("/user/bookings/", {
        params: { userId: user._id, skip: (page - 1) * limit, limit },
      });
      const bookings = response.data.bookings;
      const count = response.data.count;
      if (bookings) {
        setBookingData(bookings);
      }
      if (count) {
        setCount(Math.ceil(count / limit));
      }
      console.log("user room bookings in profile comp", bookings);
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
      toast.success("Succefully cancelled");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBookings();
  }, [refresh, page, limit]);

  const handlePageChange = async (event, value) => {
    setPage(value);

    setSkip(page * limit);

    console.log("skip", skip);
    setRefresh(!refresh);
  };
  console.log("value", "page", page);
  const handleItemsPerPage = async (e) => {
    setLimit(e.target.value);

    console.log(e.target.value);
    setRefresh(!refresh);
  };

  return (
    <>
      <section className="container pb-2">
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
                        <th>
                          <h5>Hostel Name</h5>
                        </th>
                        <th>
                          <h5>Room Name</h5>
                        </th>
                        <th>
                          <h5>Amount</h5>
                        </th>
                        <th>
                          <h5>Check In</h5>
                        </th>
                        <th>
                          <h5>Valid Till</h5>
                        </th>
                        <th>
                          <h5>Action</h5>
                        </th>
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
                            <span className="fw-normal mb-1">
                              {moment(item.checkIn)
                                .add(1, "M")
                                .format("DD-MM-YYYY")}
                            </span>
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
                  <div className="d-flex justify-content-between">
                    <Pagination
                      count={count}
                      page={page}
                      onChange={handlePageChange}
                    />
                    <div className="d-flex w-10 align-items-center">
                      <span className="m-2">view</span>
                      <select
                        name="limit"
                        className=""
                        id=""
                        onChange={handleItemsPerPage}
                      >
                        <option value={5}>5</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                      </select>
                      <span className="m-2">items</span>
                    </div>
                  </div>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </>
  );
}
