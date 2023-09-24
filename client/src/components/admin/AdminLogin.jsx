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
import { ClipLoader } from "react-spinners";

function AdminLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isNotValidForm = () => {
    if (email.trim() === "" || password.trim() === "") {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post("/admin/auth/login", {
        email,
        password,
      });
      console.log(data);
      if (data.err) {
        setError(data.message);
        setIsLoading(false);
        return;
      }
      dispatch({ type: "REFRESH-ADMIN" });
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
            <h3 className="mb-5 text-center">ADMIN LOGIN</h3>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              value={email}
              onChange={handleEmailChange}
              type="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              id="formControlLg"
              type="password"
              size="lg"
            />
            {error && (
              <div className="d-flex justify-content-between mt-3 mb-4">
                <p className="text-danger">{error}</p>
              </div>
            )}
            <div className="d-flex justify-content-between mb-4">
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              disabled={isLoading || isNotValidForm()}
              size="lg"
            >
              Sign in
              <ClipLoader
                loading={isLoading}
                color="white"
                size={15}
              ></ClipLoader>
            </MDBBtn>
            <div className="w-100 text-center">
              Don't Have an account ? <Link to="/register">Register</Link>
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
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default AdminLogin;
