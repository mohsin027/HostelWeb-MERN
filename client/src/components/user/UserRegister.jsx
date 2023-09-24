import axios from "axios";
import React, { useEffect, useState } from "react";
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
import loginImage from "../../assets/images/login.jpg";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";


function UserRegister() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });
  const [otp, setOtp] = useState("")
  const [otpPage, setOtpPage] =useState(false)
  const [resend, setResend] = useState(true)
  const [resendSecond, setRecentSecond] = useState(60)
  const [counter, setCounter] = useState(0)

  const dispatch = useDispatch();

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const isNotValidForm = () => {
    if (
      data.fullName.trim() === "" ||
      data.email.trim() === "" ||
      data.contactNumber.toString().length !== 10 ||
      data.gender.trim() === "" ||
      data.password.trim() === ""
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      if(data.password!==data.confirmPassword) {
        setError('password not match')
        setIsLoading(false)
        return 
      }
      const { data: responseData } = await axios.post("/user/auth/register", {
        ...data
      });
      console.log(responseData);
      if (responseData.err) {
        setError(responseData.message);
        setIsLoading(false);
        return;
      }
      setError(null)
      dispatch({ type: "REFRESH-USER" });
      setOtpPage(true)
      setIsLoading(false);
      setCounter(60)
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
      const response = await axios.post("/user/auth/register/verify", {
        ...data, otp
      });
      if(response.data.err){
        setError(response.data.message)
        setIsLoading(false)
        return;
      }
      dispatch({type:"REFRESH-USER"})
      toast.success("Successfully Registered")
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

  const resendEmail =async ()=>{
    setIsLoading(true)
try {
  const response = await axios.post("/user/auth/register/resendEmail",{email:data.email});
  setError(null)
  if(response){
    toast.success('resent email')
  }
  setCounter(60)
  setIsLoading(false);
} catch (error) {
  setIsLoading(false);
  console.log("Error:", error);
  setError(
    error.response ? error.response.data.error : "Unknown error occurred."
  );
  toast.error("Something went wrong")
}
  }

  // useEffect(()=>{
  //     const resendTimer = setInterval(() => {
  //       setRecentSecond(prev=>{
  //       if(prev==1){
  //         setResend(false)
  //         return 60
  //       }
  //       })
  //     }, 1000);
  //     return clearInterval(resendTimer);
  // },[resend])

  useEffect(()=>{
counter>0 && setTimeout(()=>setCounter(counter-1),1000)
  },[counter]);

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
            <h3 className="mb-5 text-center">User Register</h3>

            <MDBInput
              wrapperClass="mb-4"
              label="Full Name"
              id="formControlLg1"
              value={data.fullName}
              onChange={handleChange}
              type="text"
              name="fullName"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg2"
              value={data.email}
              onChange={handleChange}
              type="email"
              name="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Contact no"
              id="formControlLg3"
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
              id="formControlLg4"
              name="password"
              type="password"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm Password"
              value={data.confirmPassword}
              onChange={handleChange}
              id="formControlLg5"
              type="password"
              size="lg"
              name="confirmPassword"
            />

            <div>
              <MDBRadio
                name="gender"
                id="inlineRadio1"
                value="male"
                label="Male"
                onChange={handleChange}
                inline
              />
              <MDBRadio
                name="gender"
                id="inlineRadio2"
                value="female"
                label="Female"
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
            {/* <div className="d-flex justify-content-between mt-3 mb-4">
             
              <a href="!#">Forgot password?</a>
            </div> */}

            <MDBBtn
              type="submit"
              disabled={isNotValidForm() || isLoading}
              className="mb-4 w-100 mt-3"
              size="lg"
            >
              Register<ClipLoader loading={isLoading} color="white" size={15}></ClipLoader>
            </MDBBtn>
            <div className="w-100 text-center">
              Already Have an account ? <Link to="/login">Login</Link>
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
            <h3 className="mb-5 text-center">Enter OTP</h3>

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
            {
              counter!==0? 
              <p>Resend OTP in {counter} seconds</p>
              :
            <Button link disabled={isLoading} onClick={resendEmail}>Resend OTP
            <ClipLoader loading={isLoading} color="white" size={15}></ClipLoader>
            </Button>
            }

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

export default UserRegister;
