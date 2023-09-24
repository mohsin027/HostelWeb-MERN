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
import AddHostelModal from "../../modal/AddHostelModal";
import axios from "axios";
import { Link } from "react-router-dom";
import RoomHomePage from "../../pages/hostel/RoomHomePage";

function ApprovedHostelTable() {

  const { searchQuery } = useSelector((state) => state.common);
  const { hostel } = useSelector((state) => state.auth.hostel);
  const [hostelData, setHostelData] = useState([]);
  const checkHostel = async () => {
    try {
      const response = await axios.post("/hostel/hostel/check", {
        adminData: hostel._id,
      });
      const { isHostel } = response.data;
      setHostelData(isHostel.filter((i)=>i.isApproved==='Approved'));
    } catch (error) {
      console.log(error, "hostel chweck error");
    }
  };
  const [open, setOpen] = useState(false);
  useEffect(() => {
    checkHostel();
  }, []);

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
                      <Link to={'/hostel/hostel/'+hostel._id}><MDBBtn>Select</MDBBtn></Link>
                    ) : (
                      <MDBBtn color="info">view & reapply</MDBBtn>
                    )}

                    {/* <MDBDropdown>
        <MDBDropdownToggle className='transparent-btn drop-btn'>
          <RiMore2Fill className={hostel?.isApproved!=="Pending" && "icon-disabled"}/>
        </MDBDropdownToggle>
        
        {
          hostel?.isApproved==="Pending" &&
          <MDBDropdownMenu>
          <MDBDropdownItem link onClick={()=>handleStatus('Approved',hostel._id, index)}>Approve</MDBDropdownItem>
          <MDBDropdownItem link onClick={()=>handleStatus('Rejected',hostel._id, index)}>Reject</MDBDropdownItem>
        </MDBDropdownMenu>}
    </MDBDropdown> */}
                  </td>
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
      </div>
      <AddHostelModal open={open} setOpen={setOpen} />
    </MDBContainer>
  );
}

export default ApprovedHostelTable;
