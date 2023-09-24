import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBRadio,
} from "mdb-react-ui-kit";
// import loginImage from "../../assets/images/login.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ImageTOBase, isValidFileUploaded } from "../../../actions/imageToBase64";

function addHostel() {
  const navigate=useNavigate()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    hostelName: "",
    description: "",
    hostelType: "",
    admissionFees: "",
    location: "",
    adminData: "",
    hostelImage:null
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleImageChange=(e)=>{
    if(isValidFileUploaded(e.target.files[0])){
        setImage(e.target.files[0])
        setError("")
        ImageTOBase(e.target.files[0], (res)=>{
          setData({...data, hostelImage:res})
        })
    }else{
        setError("Invalid File type")
    }
}
console.log(data)
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
    try {
      console.log("succesfully added hostel");
      const { data: responseData } = await axios.post("/hostel/hostel/addHostel", {
        ...data,
      });
      console.log(responseData);
      if (responseData.err) {
        setError(responseData.message);
        return;
      }
      // dispatch({ type: "REFRESH-HOSTEL" });
      
      navigate('/hostel')
    } catch (error) {
      setIsLoading(false);
      console.log("Error:", error);
      setError(
        error.response ? error.response.data.error : "Unknown error occurred."
      );
    }
  };

  return (
    <MDBContainer className="p-3 my-5">
      <form onSubmit={handleSubmit}>
        <MDBRow className="container d-flex justify-content-center align-items-center">
          <MDBCol col="10" md="7">
            {/* <img src={loginImage} className="img-fluid" alt="Phone image" /> */}
          </MDBCol>

          <MDBCol col="4" md="5">
            <h3 className="mb-5 text-center">ADD gggg HOSTEL</h3>

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
              value={image}
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              size="lg"
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
            {
              error &&
            <div className="d-flex justify-content-between mt-3 mb-4">
              <p className="text-danger">{error}</p>
            </div>
            }
            

            <MDBBtn
              type="submit"
              disabled={isNotValidForm()}
              className="mb-4 w-100 mt-3"
              size="lg"
            >
              Submit
            </MDBBtn>
           

      
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default addHostel;

