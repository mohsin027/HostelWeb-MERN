import { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

function BookingTable(props) {

  const { searchQuery } = useSelector((state) => state.common);
  const { hostel } = useSelector((state) => state.auth.hostel);
  const [bookingData, setBookingData] = useState([]);
  const getBookings = async () => {
    try {
      const response = await axios.get("/hostel/hostel/booking");
      console.log(response,'res bookin tab in hostel');
      const { roomBooking } = response.data;
      setBookingData(roomBooking);
    } catch (error) {
      console.log(error, "booking chweck error");
    }
  };
  useEffect(() => {
    getBookings();
  }, []);
  console.log(bookingData,'booking data');

  return (
    <MDBContainer className="pt-3">
      <h4 className="mt-2 mb-3 ms-1">Booking Table</h4>
      
      <div className="table-responsive">
        <MDBTable align="middle" striped>
          <MDBTableHead className="" style={{ backgroundColor: "#E7E7E7" }}>
            <tr>
              <th className="fw-bold" scope="col">
                Hostel Name
              </th>
              <th className="fw-bold" scope="col">
                Room Title
              </th>
              <th className="fw-bold" scope="col">
                Booked By
              </th>
              <th className="fw-bold" scope="col">
                Amount
              </th>
              <th className="fw-bold" scope="col">
                Date
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {bookingData && bookingData.map((room, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      {/* <img
                        src={
                          hostel?.hostelImage?.url ??
                          "https://media-cdn.tripadvisor.com/media/photo-s/05/33/47/86/tigon-hostel.jpg"
                        }
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      /> */}
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{room.hostelId.hostelName}hh</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{room.roomId.title}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{room.userId?.fullName}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{room.amount}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{moment(room.createdAt).format("DD-MM-YYYY")}</p>
                  </td>
                  {/* <td>{hostel.hostelType}</td> */}
                  {/* <td>
                    <MDBBadge
                      color={
                        hostel?.isApproved === "Pending"
                          ? "warning"
                          : hostel?.isApproved === "Approved"
                          ? "success"
                          : "danger"
                      }
                      pill
                    >
                      {hostel?.isApproved}
                    </MDBBadge>
                  </td>
                  <td className="">
                    {hostel?.isApproved === "Approved" ? (
                      <MDBBtn>ACTIVE</MDBBtn>
                    ) : (
                      <MDBBtn color="info">view & reapply</MDBBtn>
                    )}

                  
                  </td> */}
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </MDBContainer>
  );
}

export default BookingTable;
