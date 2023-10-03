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
  MDBTextArea,
} from "mdb-react-ui-kit";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { Select } from "antd";

export default function AddComplaintModal({ user, hostels, open, setOpen }) {
  //

  const [error, setError] = useState(null);
  // const [hostels, setHostels] = useState([]);
  // const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({
    complaintType: "",
    complaintDescription: "",
    hostelId: "",
  });
  const dispatch = useDispatch();

  const hostelNameArray = hostels?.map((hostel) => {
    return { label: hostel.hostelName, value: hostel._id };
  });

  const titleSelectionArray=[
    { label: "Maintenance", value:'Maintenance'},
    { label: "Security", value:'Security'},
    { label: "Cleanliness", value:'Cleanliness'},
    { label: "Others", value:'Others'},
  ]
  console.log("hostelNameArray", hostelNameArray);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  console.log("data", data, "user", user, "hostels", hostels);

  const isNotValidForm = () => {
    if (
      data.complaintType.trim() === "" ||
      data.complaintDescription.trim() === ""
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNotValidForm()) return;
    try {
      const { data: responseData } = await axios.post("/user/addComplaint", {
        ...data,
        userId: user._id,
      });
      console.log("fffyfyfy", responseData);
      if (responseData.error) {
        setError(responseData.message);
        return;
      }
      setOpen(false);
      console.log("succesfully added complaint");
      setData({ ...data, complaintType: "", complaintDescription: "" });
      toast.success("Successfully added complaint");
    } catch (error) {
      setIsLoading(false);
      console.log("Error:", error);
      setError(
        error.response ? error.response.data.error : "Unknown error occurred."
      );
    }
  };

  const toggleShow = () => setOpen(!open);

  return (
    <>
      <MDBModal show={open} setShow={setOpen} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <Form onSubmit={handleSubmit}>
              <MDBModalHeader>
                <MDBModalTitle>Add Complaint</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                {/* <MDBInput
                  wrapperClass="mb-4"
                  label="Complaint Title"
                  id="formControlLg"
                  value={data.title}
                  onChange={handleChange}
                  type="text"
                  name="complaintType"
                  size="lg"
                /> */}
                  <div className="d-flex flex-column mb-3">
                  <span className="h6">Complaint Type</span>
                  <div className="">
                   <Select
                      placeholder="Select hostel"
                      value={data.complaintType}
                      onChange={(item) => {
                        setData({
                          ...data,
                          complaintType: item,
                        });
                      }}
                      style={{
                        width: "100%",
                        zIndex:'99999999'
                      }}
                      options={titleSelectionArray}
                    />
                  </div>
                </div>
                 {/* <Select
                      placeholder="Select hostel"
                      value={data.complaintType}
                      onChange={(item) => {
                        setData({
                          ...data,
                          complaintType: item,
                        });
                      }}
                      style={{
                        width: "100%",
                        // zIndex:'9999'
                      }}
                      options={titleSelectionArray}
                    /> */}
<span>Description</span>
                <MDBTextArea
                  wrapperClass="mb-3"
                  label="Description"
                  id="formControlLg"
                  value={data.description}
                  onChange={handleChange}
                  type="text"
                  name="complaintDescription"
                  size="xl"
                />
                <div className="d-flex flex-column">
                  <span className="h6">Select hostel</span>
                  <div className="" style={{zIndex:100000}}>
                    <Select
                      placeholder="Select hostel"
                      value={data.hostelId}
                      onChange={(item) => {
                        setData({
                          ...data,
                          hostelId: item,
                        });
                      }}
                      style={{
                        width: "100%",
                        zIndex:100000 
                      }}
                      options={hostelNameArray}
                    />
                  </div>
                </div>

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
                <MDBBtn type="submit" disabled={isNotValidForm()}>
                  Submit
                </MDBBtn>
              </MDBModalFooter>
            </Form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
