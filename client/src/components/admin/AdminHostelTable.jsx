import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBInput,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import mySwal from "../../utils/sweetalert";
import toast from "react-hot-toast";
import { RiMore2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";

function HostelTable() {
  const { searchQuery } = useSelector((state) => state.common);
  const [hostelData, setHostelData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/hostel", {
          params: { skip: (page - 1) * limit, limit },
        });
        const hostels = await response.data.hostelList;
        const count = await response.data.count;
        if (hostels) {
          setHostelData(hostels);
        }
        if (count) {
          setCount(Math.ceil(count / limit));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refresh, page,limit]);

  const handleStatus = async (status, id, index) => {
    const { isConfirmed } = await mySwal.confirm("Are You sure " + status);
    if (!isConfirmed) return;
    try {
      const { data } = await axios.patch("/admin/hostel/registerStatus", {
        stat: status,
        id,
      });
      if (!data.err) {
        const hostels = hostelData;
        hostels[index].isApproved = status;
        toast.success("Successfully " + status);
        setRefresh(!refresh);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("something went wromg");
    }
  };
  const handleListing = async (listing, id, index) => {
    const { isConfirmed } = await mySwal.confirm("Are You sure ");
    if (!isConfirmed) return;
    try {
      const { data } = await axios.patch("/admin/hostel/listingStatus", {
        listing: listing,
        id,
      });
      if (!data.err) {
        const hostels = hostelData;
        hostels[index].isBlocked = listing;
        setHostelData([...hostels]);
        setRefresh(!refresh);
        toast.success("Successfully changed status");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("something went wromg");
    }
  };
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
      <h4 className="mt-2 mb-3 ms-1">Hostels</h4>
      
      <div className="table-responsive">
        <MDBTable align="middle" striped>
          <MDBTableHead className="" style={{ backgroundColor: "#E7E7E7" }}>
            <tr>
              <th className="fw-bold" scope="col">
                Name
              </th>
              <th className="fw-bold" scope="col">
                Location
              </th>
              <th className="fw-bold" scope="col">
                Description
              </th>
              <th className="fw-bold" scope="col">
                Hostel Type
              </th>
              <th className="fw-bold" scope="col">
                Status
              </th>
              <th className="fw-bold" scope="col">
                Change status
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {hostelData
              .filter((item) =>
                item.hostelName.match(new RegExp(searchQuery, "i"))
              )
              .map((hostel, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          hostel?.hostelImage?.url ??
                          "https://media-cdn.tripadvisor.com/media/photo-s/05/33/47/86/tigon-hostel.jpg"
                        }
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{hostel.hostelName}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{hostel.location}</p>
                  </td>
                  <td>{hostel.description}</td>
                  <td>{hostel.hostelType}</td>
                  <td>
                    <MDBBadge
                      color={
                        hostel?.isApproved === "Pending" ||
                        hostel.isBlocked === true
                          ? "warning"
                          : hostel?.isApproved === "Approved"
                          ? "success"
                          : "danger"
                      }
                      pill
                    >
                      {hostel?.isApproved === "Approved"
                        ? hostel.isBlocked === false
                          ? "Listed"
                          : "Unlisted"
                        : hostel.isApproved}
                    </MDBBadge>
                  </td>
                  <td className="">
                    <MDBDropdown>
                      <MDBDropdownToggle className="transparent-btn drop-btn">
                        <RiMore2Fill className={""} />
                      </MDBDropdownToggle>

                      {hostel?.isApproved === "Pending" ? (
                        <MDBDropdownMenu>
                          <MDBDropdownItem
                            link
                            onClick={() =>
                              handleStatus("Approved", hostel._id, index)
                            }
                          >
                            Approve
                          </MDBDropdownItem>
                          <MDBDropdownItem
                            link
                            onClick={() =>
                              handleStatus("Rejected", hostel._id, index)
                            }
                          >
                            Reject
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      ) : hostel.isBlocked === false ? (
                        <MDBDropdownMenu>
                          <MDBDropdownItem
                            link
                            onClick={() =>
                              handleListing("true", hostel._id, index)
                            }
                          >
                            UnList
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      ) : (
                        <MDBDropdownMenu>
                          <MDBDropdownItem
                            link
                            onClick={() =>
                              handleListing("false", hostel._id, index)
                            }
                          >
                            List
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      )}
                    </MDBDropdown>
                  </td>
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
        <div className="d-flex justify-content-between">
          <Pagination count={count} page={page} onChange={handlePageChange} />
          <div className="d-flex w-10 align-items-center">
            <p className="m-2">view</p>
            <select name="" id="" onChange={handleItemsPerPage}>
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

export default HostelTable;
