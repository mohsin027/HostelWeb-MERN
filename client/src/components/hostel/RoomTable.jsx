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
// import AddHostelModal from "../../modal/AddHostelModal";
import axios from "axios";
import AddRoomModal from "../../modal/AddRoomModal";
import { Button } from "react-bootstrap";

function RoomTable({ hostelId }) {
  const { searchQuery } = useSelector((state) => state.common);
  const { hostel } = useSelector((state) => state.auth.hostel);
  const [roomData, setRoomData] = useState([]);
  const [blockStat, setBlockStat] = useState('');
  const checkHostel = async () => {
    try {
      const response = await axios.get("/hostel/hostel/rooms/" + hostelId);
      const { rooms } = response.data;
      console.log(rooms, "room in roomtable component");
      setRoomData(rooms);
    } catch (error) {
      console.log(error, "room chweck error");
    }
  };
  const [open, setOpen] = useState(false);
  useEffect(() => {
    checkHostel();
  }, [blockStat]);

  const handleBlockStatus =async (id,stat) => {
    try {
      const blockStatus=await axios.post("/hostel/hostel/blockStatus/",{id,stat});
      console.log(blockStatus,'blockStatus');
      setBlockStat(blockStatus)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MDBContainer className="pt-3">
      <div className='d-flex justify-content-between'>

      <h4 className="mt-2 mb-3 ms-1">Rooms </h4>
      <div>
        
      <Button onClick={() => setOpen(true)}>Add Room</Button>
      </div>
      </div>
      <div className="d-flex justify-content-end mb-2">
        {/* <MDBBtn onClick={() => setOpen(true)}>Add Hostel</MDBBtn> */}
      </div>
      <div className="table-responsive">
        <MDBTable align="middle" striped>
          <MDBTableHead className="" style={{ backgroundColor: "#E7E7E7" }}>
            <tr>
              <th className="fw-bold" scope="col">
                Room
              </th>
              <th className="fw-bold" scope="col">
                Title
              </th>
              <th className="fw-bold" scope="col">
                Capacity
              </th>
              <th className="fw-bold" scope="col">
                Occupied
              </th>
              <th className="fw-bold" scope="col">
                Rent
              </th>
              <th className="fw-bold" scope="col">
                Status
              </th>
              <th className="fw-bold" scope="col">
                Action
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {roomData
              // .filter((item) =>
              //   item.hostelName.match(new RegExp(searchQuery, "i"))

              // )
              .map((room, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          room?.room_image?.url ??
                          "https://media-cdn.tripadvisor.com/media/photo-s/05/33/47/86/tigon-hostel.jpg"
                        }
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{room.room_no}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{room.title}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{room.capacity}</p>
                  </td>
                  <td>{room.occupants}</td>
                  <td>{room.room_rent}</td>
                   <td>
                    <MDBBadge
                      color={
                        room?.block===true
                          ? "warning"
                          : "success"
                      }
                      pill
                    >
                      {room?.block?'blocked':'active'}
                    </MDBBadge>
                  </td> 
                 <td className="">
                    {room?.block === true ? (
                      <MDBBtn onClick={()=>handleBlockStatus(room._id,false)} color="success">Un Block</MDBBtn>
                    ) : (
                      <MDBBtn onClick={()=>handleBlockStatus(room._id,true)} color="warning">Block</MDBBtn>
                    )}
                    </td>
                   
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
                  {/* </td>  */}
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
      </div>
      {/* <AddHostelModal open={open} setOpen={setOpen} /> */}
      <AddRoomModal hostelId={hostelId} open={open} setOpen={setOpen} />
    </MDBContainer>
  );
}

export default RoomTable;
