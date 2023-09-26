import { useEffect, useState } from "react";
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
} from "mdb-react-ui-kit";

import { useDispatch, useSelector } from "react-redux";
import AddHostelModal from "../../modal/AddHostelModal";
import EditHostelModal from "../../modal/EditHostelModal";
import axios from "axios";
import { FiEdit3 } from "react-icons/fi";
import { RiMore2Fill } from "react-icons/ri";
import mySwal from "../../utils/sweetalert";
import toast from "react-hot-toast";
import { Pagination } from "@mui/material";

function HostelTable(props) {
  const { searchQuery } = useSelector((state) => state.common);
  const { hostel } = useSelector((state) => state.auth.hostel);
  const [hostelData, setHostelData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const checkHostel = async () => {
    try {
      const response = await axios.get("/hostel/hostel/check", {
        params: { adminData: hostel._id, skip: page - 1, limit },
      });
      const hostels = response.data.hostelList;
      const count = response.data.count;
      if (hostels) {
        setHostelData(hostels);
      }
      if (count) {
        setCount(Math.ceil(count / limit));
      }
    } catch (error) {
      console.log(error, "hostel chweck error");
    }
  };

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState("");
  useEffect(() => {
    checkHostel();
  }, [openEdit, refresh, page, limit]);

  const handleListing = async (listing, id, index) => {
    const { isConfirmed } = await mySwal.confirm("Are You sure ");
    if (!isConfirmed) return;
    try {
      const { data } = await axios.patch("/hostel/hostel/listingStatus", {
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
    <MDBContainer className="pt-3">
      <h4 className="mt-2 mb-3 ms-1">Hostels</h4>
      <div className="d-flex justify-content-end mb-2">
        <MDBBtn onClick={() => setOpen(true)}>Add Hostel</MDBBtn>
      </div>
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
                Hostel Type
              </th>
              <th className="fw-bold" scope="col">
                Status
              </th>
              <th className="fw-bold" scope="col">
                Choose
              </th>
              <th className="fw-bold" scope="col">
                Action
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
                  <td>{hostel.hostelType}</td>
                  <td>
                    {/* <MDBBadge
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
                    </MDBBadge> */}
                    <MDBBadge
                      color={
                        hostel?.isApproved === "Approved"
                          ? hostel.isBlocked === false
                            ? "success"
                            : "warning"
                          : hostel?.isApproved === "Pending"
                          ? "warning"
                          : "danger"
                      }
                      // hostel?.isApproved==="Approved" ? 'success':"danger"
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
                    {hostel?.isApproved === "Approved" ? (
                      <MDBBtn>ACTIVE</MDBBtn>
                    ) : (
                      <MDBBtn color="info">view & reapply</MDBBtn>
                    )}
                  </td>
                  <td>
                    <div className="d-flex">
                      <FiEdit3
                        type="button"
                        onClick={() => {
                          setOpenEdit(true);
                          setEditData(hostel);
                        }}
                      ></FiEdit3>

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
                    </div>
                  </td>
                  <EditHostelModal
                    editData={editData}
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                  />
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
        <div className="d-flex justify-content-between">
          <Pagination count={count} page={page} onChange={handlePageChange} />
          <div className="d-flex w-10 align-items-center">
            <p className="m-2">view</p>
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
            <p className="m-2">items</p>
          </div>
        </div>
      </div>
      <AddHostelModal open={open} setOpen={setOpen} />
    </MDBContainer>
  );
}

export default HostelTable;
