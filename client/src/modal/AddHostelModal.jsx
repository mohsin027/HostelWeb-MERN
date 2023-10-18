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

export default function AddHostelModal({ open, setOpen }) {
  //
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({
    hostelName: "",
    description: "",
    hostelType: "",
    admissionFees: "",
    hostelImage: null,
    location: "",
    adminData: "",
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
        setData({ ...data, hostelImage: res });
      });
    } else {
      setError("Invalid File type");
    }
  };

  const isNotValidForm = () => {
    if (
      data.hostelName.trim() === "" ||
      data.description.trim() === "" ||
      data.admissionFees.toString().trim() === "" ||
      data.hostelType === "" ||
      data.location.trim() === ""
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
        "/hostel/hostel/addHostel",
        {
          ...data,
          adminData: hostel.hostel._id,
        }
      );
      if (responseData.err) {
        setError(responseData.message);
        return;
      }
      // dispatch({ type: "REFRESH-HOSTEL" });
      setOpen(false);
      setData({
        hostelName: "",
        description: "",
        hostelType: "",
        admissionFees: "",
        hostelImage: null,
        location: "",
        adminData: "",
      });
      // navigate('/hostel')
      toast.success("successfully added hostel");
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
                <MDBModalTitle>Add Hostel</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Hostel Name"
                  id="formControlLg"
                  value={data.hostelName}
                  onChange={handleChange}
                  type="text"
                  name="hostelName"
                  size="lg"
                />
                {/* <MDBInput
              wrapperClass="mb-4"
              id="formControlLg"
              value={data.adminData}
              onChange={handleChange}
              type="text"
              name="adminData"
              size="lg"
              hidden
            /> */}
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
                  label="Addmission Fees"
                  id="formControlLg"
                  value={data.admissionFees}
                  onChange={handleChange}
                  type="number"
                  size="lg"
                  name="admissionFees"
                />

                <MDBInput
                  wrapperClass="mb-4"
                  label="Location"
                  value={data.location}
                  onChange={handleChange}
                  id="formControlLg"
                  type="text"
                  size="lg"
                  name="location"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  // value={image}
                  onChange={handleImageChange}
                  id="formControlLg"
                  type="file"
                  accept="image/*"
                  size="lg"
                  name="Image"
                />

                <div>
                  <MDBRadio
                    name="hostelType"
                    id="inlineRadio1"
                    value="men"
                    label="Men"
                    onChange={handleChange}
                    inline
                  />
                  <MDBRadio
                    name="hostelType"
                    id="inlineRadio2"
                    value="women"
                    label="Women"
                    onChange={handleChange}
                    inline
                  />
                </div>
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
