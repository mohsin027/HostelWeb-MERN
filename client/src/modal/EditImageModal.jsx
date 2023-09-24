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
  MDBCol,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import axios from "axios";
import { ImageTOBase, isValidFileUploaded } from "../actions/imageToBase64";
import { useDispatch, useSelector } from "react-redux";

export default function EditImageModal({open, setOpen} ) {
  const { user } = useSelector((state) => state.auth.user);
  console.log('user', user);
  const toggleShow = () => setOpen(!open);
  const [previewImage, setPreviewImage] = useState('')
  const [file, setFile] = useState('')
  const [finalImage, setFinalImage] = useState('')
  const [error, setError] = useState(null)
const dispatch=useDispatch()


  const handleChange=(e)=>{
    if(isValidFileUploaded(e.target.files[0])){
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0])
        // setError("")
        ImageTOBase(e.target.files[0], (res)=>{
          setFinalImage(res)
        })
    }else{
        setError("Invalid File type")
    }
}
console.log(finalImage)

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const { data: responseData } = await axios.patch(
        "/user/editUserProfileImage",
        {id:user._id,image:finalImage}
      );
      console.log(responseData);
      if (responseData.err) {
        setError(responseData.message);
        return;
      }
      dispatch({ type: "REFRESH-USER" });
      console.log("succesfully edited");
      // setData({
      //   hostelImage:finalImage,
      // });
      setOpen(false);
    } catch (error) {
      console.log("Error:", error);
      setError(
        error.response ? error.response.data.error : "Unknown error occurred."
      );
    }
  };

  return (
    <>
      <MDBModal show={open} setShow={setOpen} tabIndex="-1">
        <MDBModalDialog centered size="md">
          <MDBModalContent>
            <Form>
              <MDBModalHeader>
                <MDBModalTitle>Upload Image</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
              
                <MDBContainer>
                 <MDBRow>
                    <MDBCol className="d-flex p-3 justify-content-center" md={12}>
                        <img style={{width:"100%"}} src={previewImage} alt="" />
                    </MDBCol>
                    <MDBCol md={12}>
                        <MDBInput onChange={handleChange} type="file"></MDBInput>
                    </MDBCol>
                 </MDBRow>
                
                </MDBContainer>
              </MDBModalBody>

              <MDBModalFooter className="justify-content-center">
                <MDBBtn rounded color="secondary" onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn rounded type="button" onClick={handleClick}>
                  save
                </MDBBtn>
              </MDBModalFooter>
            </Form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
