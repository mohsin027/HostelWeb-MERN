import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";

export default function HostelNavbar() {
  const [showBasic, setShowBasic] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get("/hostel/auth/logout");
    dispatch({ type: "REFRESH-HOSTEL" });
  };
  return (
    <MDBNavbar
      className="position-sticky sticky-top"
      expand="lg"
      light
      bgColor="light"
    >
      <MDBContainer fluid>
      <div className="d-flex gap-3 align-items-center">
            <Link to={'/hostel'}>
          <h4 className="brand-name d-flex" >
          <RiMenu2Line className="me-3 menu-icon" />
            HostelWeb
            </h4>
            </Link> 
        </div>
        <div className="w-100 d-flex justify-content-center">
          <div className="search-box">
            <input type="text" placeholder="search..." />
            <button>
              <FiSearch />
            </button>
          </div>
        </div>

        {/* <MDBCollapse navbar show={showBasic}> */}

        {/* <form className="d-flex input-group w-auto"> */}
        {/* </form> */}
        <MDBDropdown>
          <MDBDropdownToggle
            tag="a"
            className="nav-link gap-1 d-flex align-items-center"
            role="button"
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-circle ms-3"
              alt="Avatar"
              height={30}
              width={30}
            />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link>My Account</MDBDropdownItem>
            <MDBDropdownItem link onClick={handleLogout}>
              Logout
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        {/* </MDBCollapse> */}
      </MDBContainer>
    </MDBNavbar>
  );
}
