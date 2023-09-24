import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBRadio,
  MDBRow,
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { ImageTOBase, isValidFileUploaded } from "../actions/imageToBase64";
import toast from "react-hot-toast";

export default function RoomDetailsModal({ open, setOpen, room,avail, handleBooking,genderMatch }) {
  const toggleShow = () => setOpen(!open);

  const handleSubmit = () => {};

  return (
    <>
      <MDBModal show={open} setShow={setOpen} tabIndex="-1">
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <Form onSubmit={handleSubmit}>
              <MDBModalHeader>
                <MDBModalTitle>Room Details</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBRow style={{ padding: "10px" }}>
                  <MDBCarousel
                    style={{ borderRadius: "10px", overflow: "hidden" }}
                    showControls
                    showIndicators
                    className="p-0"
                  >
                    <MDBCarouselItem
                      className="w-100 d-block"
                      itemId={1}
                      src="https://mdbootstrap.com/img/new/slides/041.jpg"
                      alt="..."
                    />
                    <MDBCarouselItem
                      className="w-100 d-block"
                      itemId={2}
                      src="https://mdbootstrap.com/img/new/slides/042.jpg"
                      alt="..."
                    />
                    <MDBCarouselItem
                      className="w-100 d-block"
                      itemId={3}
                      src="https://mdbootstrap.com/img/new/slides/043.jpg"
                      alt="..."
                    />
                  </MDBCarousel>
                </MDBRow>
                <MDBContainer>
                  <MDBRow className="mt-3 ">
                    <div className="w-100 d-flex justify-content-center">
                      <h5 className="font-weight-bold">{room.title}</h5>
                    </div>
                  </MDBRow>
                 
                  <MDBRow className="mt-1">
                  <MDBCardText>
                    {room.capacity === 1 ? "Single" : room.capacity + " shared"}
                  </MDBCardText>
                  </MDBRow>
                  <MDBRow className="mt-2">
                    <b>₹ {room.room_rent}</b>
                  </MDBRow>
                  <MDBRow className="mt-1">
                  <MDBCardText>{room.description}</MDBCardText>
                  </MDBRow>
                  <MDBRow className="mt-1">
                  <MDBCardText> 
          {avail<=0?<p className="text-danger">` Not Available`</p>:"Slots Available "+avail}
          {genderMatch===false && <p className="error">gender not match</p>}
             </MDBCardText>
                  </MDBRow>
                </MDBContainer>
              </MDBModalBody>

              <MDBModalFooter className="justify-content-center">
                <MDBBtn rounded type="button" color="secondary" onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn rounded type="button" disabled={avail<=0 || genderMatch===false } onClick={handleBooking}>
                  Book Now
                </MDBBtn>
              </MDBModalFooter>
            </Form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
