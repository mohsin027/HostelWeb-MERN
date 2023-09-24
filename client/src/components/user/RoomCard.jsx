import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import hostelImage from "../../images/hostel.jpg";
import { Link, useNavigate } from "react-router-dom";
import mySwal from "../../utils/sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";
import RoomDetailsModal from "../../modal/RoomDetailsModal";

export default function RoomCard({ room,hostelId,genderMatch }) {
  const {user} = useSelector((state)=>state.auth.user)
  const [roomDetailsOpen, setRoomDetailsOpen] =useState(false)
  const [value, setValue] = useState(null)
    const navigate=useNavigate()
    const handleBooking = async (e) => {
      e.stopPropagation()
      const { data } = await axios.post("/user/payment", {amount:room.room_rent});
      if (!data.err) {
          handleRazorPay(data.order);
      }
  }
    const handleRazorPay = (order) => {
      const options = {
          key: "rzp_test_bDdvQPDrVSYCbU",
          amount: order.amount,
          currency: order.currency,
          name: "Hostel WEB",
          description: "Test Transaction",
          order_id: order.id,
          handler: async (response) => {
              const { data } = await axios.post("/user/payment/verify", { response, roomId: room._id,personCount:1, hostelId, amount:room.room_rent, userId:user._id });
              if(data.err){
                  mySwal.error(data.message)
              }else{
                 mySwal.success("Sucessfully Booked")
                    navigate("/user/profile")
              }
              // setRefresh(!refresh)
          }
      }
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on('payment.failed', (response) => {
          mySwal.error( response.error.description)
          // setRefresh(!refresh)
      })

  }

const avail=room.capacity-room.occupants


  return (
    <div >
      <MDBCard onClick={()=>setRoomDetailsOpen(true)} >
        <MDBCardImage
          src={room.room_image?.url || hostelImage}
          position="top"
          alt="..."
          style={{height:"12rem"}}
          />
          
        <MDBCardBody>
          <MDBCardTitle>{room.title}</MDBCardTitle>


          <MDBCardTitle>₹ {room.room_rent}</MDBCardTitle>
          <MDBCardText> 
          {avail<=0?<p className="text-danger">` Not Available`</p>:"Slots Available "+avail}
          {genderMatch===false && <p className="error">gender not match</p>}
             </MDBCardText>
          <MDBBtn rounded onClick={handleBooking} className={(avail<=0 || genderMatch===false) && "disabled"}>
              Book Now
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <RoomDetailsModal room={room} handleBooking={handleBooking} avail={avail} open={roomDetailsOpen} setOpen={setRoomDetailsOpen} genderMatch={genderMatch}/>

    </div>
  );
}
