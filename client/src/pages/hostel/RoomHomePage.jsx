import React, { useState } from "react";
import HostelNavbar from "../../components/hostel/HostelNavbar";
import RoomSidebar from "../../components/hostel/RoomSidebar";
import AddRoomModal from "../../modal/AddRoomModal";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RoomTable from "../../components/hostel/RoomTable";

export default function RoomHomePage() {
  const [open, setOpen] = useState(false);
  const { hostelId } = useParams();
  return (
    <>
      <HostelNavbar />
      <div className="d-flex">
        <RoomSidebar hostelId={hostelId} />
        <div className="m-2">

          <p>RoomHomePage {hostelId}</p>
          <div>

        {/* <Button onClick={() => setOpen(true)}>Add Room</Button> */}
        <RoomTable hostelId={hostelId} />
          </div>

      <AddRoomModal hostelId={hostelId} open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}
