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
import { Pagination } from "@mui/material";

function BookingTable(props) {

  const { searchQuery } = useSelector((state) => state.common);
  const { hostel } = useSelector((state) => state.auth.hostel);
  const [bookingData, setBookingData] = useState([]);
  const [active, setActive] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const getBookings = async () => {
    try {
      const response = await axios.get("/hostel/hostel/booking",{params: {hostelAdminId:hostel._id,skip: (page - 1)*limit, limit}});
      // const { roomBooking } = response.data;
      const roomBooking = await response.data.roomBooking;
      const count = await response.data.count;
      if(roomBooking){
        setBookingData(roomBooking);
      }
      if (count) {
        setCount(Math.ceil(count/limit));
      }
    } catch (error) {
      console.log(error, "booking check error");
    }
  };
  useEffect(() => {
    getBookings();
  }, [refresh, page,limit]);

  const handlePageChange = async (event, value) => {
    setPage(value);
    setSkip(page * limit);
    setRefresh(!refresh);
  };
  const handleItemsPerPage = async (e) => {
    setLimit(e.target.value);
    setRefresh(!refresh);
  };

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
                CheckIn
              </th>
              <th className="fw-bold" scope="col">
                Checkout
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {bookingData && bookingData.map((room, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                     
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
                  <td>
                    <p className="fw-normal mb-1">{moment(room.createdAt).add(1,'M').format("DD-MM-YYYY")}</p>
                  </td>
                
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
        <div className="d-flex justify-content-between">
          <Pagination count={count} page={page} onChange={handlePageChange} />
          <div className="d-flex w-10 align-items-center">
            <p className="m-2">view</p>
            <select name="limit" className="" id=""  onChange={handleItemsPerPage}>
              <option value={5}>5</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <p className="m-2">items</p>
          </div>
        </div>
      </div>
      
    </MDBContainer>
  );
}

export default BookingTable;
