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
} from "mdb-react-ui-kit";
import loginImage from "../../assets/images/login.jpg";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function UserLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const [forgetPassword, setForgetPassword]= useState("");
  // const [forgetPasswordEmail, setForgetPasswordEmail]= useState("");
  // const [forgetPasswordComp, setForgetPasswordComp]= useState("");

  const handleEmailChange = (e) => {
    setError(null)
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    let redirectUri =
      process.env.REACT_APP_SERVER_URL + "/user/auth/google/callback";
    let clientId =
      "1038681536837-5apaj089qgtgfftk7apk44bpoa3ll15u.apps.googleusercontent.com";
    try {
      window.open(
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20profile`,
        "_self"
      );
    } catch (error) {
      console.log("Google login error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/user/auth/login", {
        email,
        password,
      });
      if (data.err) {
        setError(data.message);
        return;
      }
      dispatch({ type: "REFRESH-USER" });
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
            <img src={loginImage} className="img-fluid" alt="Phone image" />
          </MDBCol>

          <MDBCol col="4" md="5">
            <h3 className="mb-5 text-center">LOGIN</h3>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              value={email}
              onChange={handleEmailChange}
              type="email"
              size="lg"
              pattern=".+@*\.com"
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              id="formControlLg"
              type="password"
              size="lg"
              required
            />
            {error && (
              <div className="d-flex justify-content-between mt-3 mb-4">
                <p className="text-danger">{error}</p>
              </div>
            )}
            <div className="d-flex justify-content-between mb-4">
              {/* <a href="!#">Forgot password?</a> */}
            </div>

            <MDBBtn className="mb-4 w-100" size="lg">
              Sign in
            </MDBBtn>
            <div className="w-100 text-center">
              Don't Have an account ? <Link to="/register">Register</Link>
            </div>
            <div className="d-flex align-content-center">
              
            <MDBBtn
              className="mb-4 w-100 d-flex justify-content-center"
              onClick={handleGoogleLogin}
              size="lg"
              style={{ backgroundColor: "white", color: "black" }}
              >
              {/* <MDBIcon fab icon="google-g" className="mx-2" /> */}
              <FcGoogle className="m-1 me-2" />
              Continue with Google
            </MDBBtn>
              </div>
              <div className="w-100 text-center ">
              Hostel Admin/Owner ? <Link to={process.env.REACT_APP_CLIENT_URL+"/hostel"}>Click here</Link>
            </div>
            

            {/* <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">OR</p>
    </div>


    <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
      <MDBIcon fab icon="twitter" className="mx-2"/>
      Continue with twitter
    </MDBBtn> */}
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default UserLogin;
