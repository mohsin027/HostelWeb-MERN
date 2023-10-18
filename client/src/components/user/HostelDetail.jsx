import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RoomCard from "./RoomCard";
import { MDBContainer } from "mdb-react-ui-kit";
import { Col, Row } from "react-bootstrap";
import UserNavbar from "./UserNavbar";
import axios from "axios";
import RoomDetailsModal from "../../modal/RoomDetailsModal";
import { useSelector } from "react-redux";
import { getHostelDetails } from "../../api/userApi";

export const HostelDetail = (hostels) => {
  const { user } = useSelector((state) => state.auth.user);
  const location = useLocation();
  const { hostelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [hostel, setHostel] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await getHostelDetails(hostelId);
    const hostel = response.data.hostel;
    const data = response.data;
    if (!data.err) {
      setHostel(hostel);
      setRooms([...hostel.rooms]);
    }
  };
  const hostelGender = hostel.hostelType === "men" ? "male" : "female";
  const genderMatch = user.gender === hostelGender ? true : false;

  return (
    <>
      <UserNavbar />
      <MDBContainer>
        <Row className="pt-4 shadow mt-1 rounded">
          <Col md={6} className=" py-4">
            <img
              style={{ height: "25rem", borderRadius: "0.5rem" }}
              src={hostel?.hostelImage?.url}
              alt="hostel image"
            />
          </Col>
          <Col md={6} className="p-5">
            <h1>{hostel?.hostelName}</h1>
            <div className="mt-5" style={{ height: "12rem" }}>
              <h5>Description:</h5>
              <p>{hostel.description}</p>
            </div>
            <div>
              <h5>Hostel Type:{hostel?.hostelType}</h5>
            </div>
            <div>
              <h4>Location:{hostel?.location}</h4>
            </div>
          </Col>
        </Row>
        <Row className="mt-3 mb-5 p-3 shadow rounded">
          <h2>Rooms</h2>

          {/* {rooms.filter(room=>room.match(new RegExp(searchQuery, 'i'))).map((room,index)=> */}
          {rooms.map((room, index) => (
            <Col key={index} md={3} className="mt-2">
              <RoomCard room={room} hostel={hostel} genderMatch={genderMatch} />
            </Col>
          ))}
        </Row>
      </MDBContainer>
    </>
  );
};
