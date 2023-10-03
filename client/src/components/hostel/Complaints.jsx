import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import AddComplaintModal from "../../modal/AddComplaintModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { RiMore2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import mySwal from "../../utils/sweetalert";
import moment from "moment";

export default function Complaints() {
  const { user } = useSelector((state) => state.auth.user);
  //   const {hostels}=useSelector((state) => state.common.hostels)
  const { hostel } = useSelector((state) => state.auth.hostel);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [complaintsData, setComplaintsData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("/hostel/hostel/getComplaints", {
      params: { hostelAdminId: hostel._id },
    });
    const complaints = response.data.complaints;
    setComplaintsData(complaints);
  };

  useEffect(() => {
    fetchData();
  }, [open, refresh]);

  const handleStatus = async (status, id, index) => {
    const { isConfirmed } = await mySwal.confirm("Are You sure " + status);
    if (!isConfirmed) return;
    try {
      const { data } = await axios.patch("/hostel/hostel/complaintStatus", {
        stat: status,
        id,
      });
      if (!data.error) {
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

  console.log("user", user, "hostels", hostel);
  return (
    <section className="container mt-5">
      <MDBCard>
        <MDBCardHeader className="d-flex justify-content-between">
          <MDBCardTitle>Complaints</MDBCardTitle>
          {/* <MDBBtn onClick={()=>setOpen(true)}>Register Complaint</MDBBtn> */}
        </MDBCardHeader>
        <MDBCardBody>
          <MDBTable>
            <MDBTableHead>
              <tr style={{ fontSize: "1.2rem" }}>
                <th>Date</th>
                <th>Complaint Type</th>
                <th>Description</th>
                <th>Ref Hostel</th>
                <th>status</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {complaintsData?.map((complaint, index) => (
                <tr key={complaint._id}>
                  <td>{moment(complaint.createdAt).format("YYYY-MM-DD")}</td>
                  <td>{complaint.complaintType}</td>
                  <td>{complaint.complaintDescription}</td>
                  <td>{complaint.hostelId?.hostelName || "na"}</td>
                  <td className="d-flex">
                    {complaint.status || "na"}

                    <MDBDropdown>
                      <MDBDropdownToggle className="transparent-btn drop-btn">
                        <RiMore2Fill className={""} />
                      </MDBDropdownToggle>

                      {complaint?.status === "New" ? (
                        <MDBDropdownMenu>
                          <MDBDropdownItem
                            link
                            onClick={() =>
                              handleStatus("InProgress", complaint._id, index)
                            }
                          >
                            InProgress
                          </MDBDropdownItem>
                          <MDBDropdownItem
                            link
                            onClick={() =>
                              handleStatus("Resolved", complaint._id, index)
                            }
                          >
                            Resolved
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      ) : (
                        <MDBDropdownMenu>
                          <MDBDropdownItem
                            link
                            onClick={() =>
                              handleStatus("Resolved", complaint._id, index)
                            }
                          >
                            Resolved
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      )}
                    </MDBDropdown>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
      {/* <AddComplaintModal open={open} setOpen={setOpen} user={user} hostels={hostels}/> */}
    </section>
  );
}
