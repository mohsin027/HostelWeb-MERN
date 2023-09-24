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
import loginImage from "../../../assets/images/login.jpg";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function HostelRegister() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });
  const [otp, setOtp] = useState("")
  const [otpPage, setOtpPage] =useState(false)

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {name, value} = e.target
    setData({...data, [name]:value})
  };
  const isNotValidForm = () => {
    if(data.fullName.trim() === "" || data.email.trim() === "" || data.contactNumber.toString().length !== 10  || data.password.trim() === ""){
      return true
    }
    return false
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
setIsLoading(true)
   
    try {
      if(data.password!==data.confirmPassword) {
        setError('PAssword not match')
        return 
      }
      const response = await axios.post("/hostel/auth/register", {
        ...data
      });
      if(response.data.err){
        setError(response.data.message)
        setIsLoading(false)
        return;
      }
      dispatch({type:"REFRESH-HOSTEL"})
      setOtpPage(true)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false);
      console.log("Error:", error);
      toast.error("Something went wrong")
      setError(
        error.response ? error.response.data.error : "Unknown error occurred."
      );
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
setIsLoading(true)
   
    try {
      const response = await axios.post("/hostel/auth/register/verify", {
        ...data, otp
      });
      if(response.data.err){
        setError(response.data.message)
        setIsLoading(false)
        return;
      }
      dispatch({type:"REFRESH-HOSTEL"})
      toast.success("Successfull Registered")
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false);
      console.log("Error:", error);
      setError(
        error.response ? error.response.data.error : "Unknown error occurred."
      );
      toast.error("Something went wrong")
    }
  };

  const verifyOtp=(e)=>{
    e.preventDefault()
  }

  return (
    <MDBContainer className="p-3 my-5">
      <form onSubmit={handleSubmit}>
        <MDBRow className="container d-flex justify-content-center align-items-center">
          <MDBCol col="10" md="7">
            <img src={loginImage} className="img-fluid" alt="Phone image" />
      </MDBCol>
      
    {
      otpPage!=true ?
          <MDBCol col="4" md="5">
            <h3 className="mb-5 text-center">Hostel Register</h3>

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
              label="Email address"
              id="formControlLg"
              value={data.email}
              onChange={handleChange}
              type="email"
              name="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Contact no"
              id="formControlLg"
              value={data.contactNumber}
              onChange={handleChange}
              type="number"
              size="lg"
              name="contactNumber"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              value={data.password}
              onChange={handleChange}
              id="formControlLg"
              name="password"
              type="password"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm Password"
              value={data.confirmPassword}
              onChange={handleChange}
              id="formControlLg"
              type="password"
              size="lg"
              name="confirmPassword"
            />
           
            {
              error &&
            <div className="d-flex justify-content-between mt-3 mb-4">
              <p className="text-danger">{error}</p>
            </div>
            }
            {/* <div className="d-flex justify-content-between mt-3 mb-4">
             
              <a href="!#">Forgot password?</a>
            </div> */}

            <MDBBtn type="submit" disabled={isNotValidForm() || isLoading} className="mb-4 w-100 mt-3" size="lg">
              Register <ClipLoader loading={isLoading} color="white" size={15}></ClipLoader>
            </MDBBtn>
            <div className="w-100 text-center">
              Do you have an account ? <Link to="/hostel/login">Login</Link>
            </div>

            {/* <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">OR</p>
    </div>

    <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
      <MDBIcon fab icon="facebook-f" className="mx-2"/>
      Continue with facebook
    </MDBBtn>

    <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
      <MDBIcon fab icon="twitter" className="mx-2"/>
      Continue with twitter
    </MDBBtn> */}
          </MDBCol>
          :
          <MDBCol col="4" md="5">
            <h3 className="mb-5 text-center">Enter Otp</h3>

            <MDBInput
              wrapperClass="mb-4"
              label="OTP"
              id="formControlLg"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              type="text"
              name="otp"
              size="lg"
            />
            {
            error &&
            <div className="d-flex justify-content-between mt-3 mb-4">
              <p className="text-danger">{error}</p>
            </div>
            }
            {/* <div className="d-flex justify-content-between mt-3 mb-4">
             
              <a href="!#">Forgot password?</a>
            </div> */}

            <MDBBtn type="submit" onClick={handleVerifyOtp} disabled={!otp || isLoading} className="mb-4 w-100 mt-3" size="lg">
              Verify <ClipLoader loading={isLoading} color="white" size={15}></ClipLoader>
            </MDBBtn>
            

            {/* <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">OR</p>
    </div>

    <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
      <MDBIcon fab icon="facebook-f" className="mx-2"/>
      Continue with facebook
    </MDBBtn>

    <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
      <MDBIcon fab icon="twitter" className="mx-2"/>
      Continue with twitter
    </MDBBtn> */}
          </MDBCol>
}


        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default HostelRegister;
