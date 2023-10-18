import React, { useEffect, useState } from "react";
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

export default function EditUserProfileModal({ open, setOpen }) {
  //
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  //   const handleImageChange=(e)=>{
  //     if(isValidFileUploaded(e.target.files[0])){
  //         console.log(e.target.files[0])
  //         setImage(e.target.files[0])
  //         setError("")
  //         ImageTOBase(e.target.files[0], (res)=>{
  //           setData({...data, userImage:res})
  //         })
  //     }else{
  //         setError("Invalid File type")
  //     }
  // }

  useEffect(() => {
    if (user) {
      const { fullName, address, contactNumber, _id } = user.user;
      setData({ ...data, fullName, address, contactNumber, id: _id });
    }
  }, [user]);

  // const isNotValidForm = () => {
  //   if (
  //     data.fullName.trim() === "" ||
  //     data.email.trim() === "" ||
  //     data.password.toString().trim() === "" ||
  //     data.gender === "" ||
  //     data.contactNumber.trim() === ""
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(isNotValidForm()) return;
    try {
      const { data: responseData } = await axios.patch(
        "/user/editUserProfile",
        data
      );
      if (responseData.err) {
        setError(responseData.message);
        return;
      }
      setOpen(false);
      dispatch({ type: "REFRESH-USER" });
      setData({
        fullName: "",
        contactNumber: "",
        address: "",
      });
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
                <MDBModalTitle>Edit</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Full Name"
                  id="formControlLg"
                  value={data.fullName}
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4"
                  label="Contact no"
                  id="formControlLg1"
                  value={data.contactNumber}
                  onChange={handleChange}
                  type="number"
                  size="lg"
                  name="contactNumber"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Address"
                  id="formControlLg2"
                  value={data.address}
                  onChange={handleChange}
                  type="text"
                  size="lg"
                  name="address"
                />

                {error && (
                  <div className="d-flex justify-content-between mt-3 mb-4">
                    <p className="text-danger">{error}</p>
                  </div>
                )}
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn type="submit">Save</MDBBtn>
              </MDBModalFooter>
            </Form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
