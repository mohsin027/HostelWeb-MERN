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
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { ImageTOBase, isValidFileUploaded } from "../actions/imageToBase64";
import toast from "react-hot-toast";

export default function AddRoomModal({ hostelId, open, setOpen }) {
  //
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({
    room_no: "",
    capacity: "",
    room_rent: "",
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const { hostel } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleImageChange = (e) => {
    if (isValidFileUploaded(e.target.files[0])) {
      setImage(e.target.files[0]);
      setError("");
      ImageTOBase(e.target.files[0], (res) => {
        setData({ ...data, room_image: res });
      });
    } else {
      setError("Invalid File type");
    }
  };

  const isNotValidForm = () => {
    if (
      data.room_no.trim() === "" ||
      data.room_rent.toString().trim() === "" ||
      data.capacity === "" ||
      data.title.trim() === "" ||
      data.description.trim() === ""
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNotValidForm()) return;
    try {
      const { data: responseData } = await axios.post(
        "/hostel/hostel/addRooms",
        {
          ...data,
          hostelId,
        }
      );
      if (responseData.err) {
        setError(responseData.message);
        return;
      }
      // dispatch({ type: "REFRESH-HOSTEL" });
      setOpen(false);
      setData({
        room_no: "",
        capacity: "",
        room_rent: "",
        title: "",
        description: "",
      });
      // navigate('/hostel')
      toast.success("Successfully added room");
    } catch (error) {
      setIsLoading(false);
      console.log("Error:", error);
      setError(
        error.response ? error.response.data.error : "Unknown error occurred."
      );
    }
  };
  //

  const toggleShow = () => setOpen(!open);

  return (
    <>
      <MDBModal show={open} setShow={setOpen} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <Form onSubmit={handleSubmit}>
              <MDBModalHeader>
                <MDBModalTitle>Add Room</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Room Title"
                  id="formControlLg"
                  value={data.title}
                  onChange={handleChange}
                  type="text"
                  name="title"
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4"
                  label="Description"
                  id="formControlLg"
                  value={data.description}
                  onChange={handleChange}
                  type="text"
                  name="description"
                  size="xl"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Room No"
                  id="formControlLg"
                  value={data.room_no}
                  onChange={handleChange}
                  type="number"
                  size="lg"
                  name="room_no"
                />

                <MDBInput
                  wrapperClass="mb-4"
                  label="Room Rent"
                  value={data.room_rent}
                  onChange={handleChange}
                  id="formControlLg"
                  type="text"
                  size="lg"
                  name="room_rent"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Capacity"
                  value={data.capacity}
                  onChange={handleChange}
                  id="formControlLg"
                  type="text"
                  size="lg"
                  name="capacity"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  // value={image}
                  onChange={handleImageChange}
                  id="formControlLg"
                  type="file"
                  accept="image/*"
                  size="lg"
                  name="room_image"
                />

                {error && (
                  <div className="d-flex justify-content-between mt-3 mb-4">
                    <p className="text-danger">{error}</p>
                  </div>
                )}

                {/* <MDBBtn
              type="submit"
              disabled={isNotValidForm()}
              className="mb-4 w-100 mt-3"
              size="lg"
            >
              Submit
            </MDBBtn> */}
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn type="submit" disabled={isNotValidForm()}>
                  Save
                </MDBBtn>
              </MDBModalFooter>
            </Form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
