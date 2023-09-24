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
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NavMain() {
  const [showBasic, setShowBasic] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get("/user/auth/logout");
    dispatch({ type: "REFRESH-USER" });
  };
  return (
    <MDBNavbar
      className="position-sticky sticky-top"
      expand="lg"
      light
      bgColor="light"
    >
      <MDBContainer>
        <div className="d-flex gap-3 align-items-center">
          <h4 className="brand-name" >HostelWeb</h4>
          <Link className="ms-3">Home</Link>
          <Link>Help</Link>
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
              <MDBDropdownItem link>
              <Link to='/user/profile' relative="path">

                My Account
              </Link>
                </MDBDropdownItem>
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
