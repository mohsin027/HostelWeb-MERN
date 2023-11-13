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
import { useDisclosure } from "@chakra-ui/react";
import { RiMenu2Line } from "react-icons/ri";

export default function HostelNavbar() {
  const [showBasic, setShowBasic] = useState(false);
  const dispatch = useDispatch();

  const {searchQuery} = useSelector((state)=>state.common)


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
      <MDBContainer fluid className="d-flex" style={{flexWrap:"nowrap"}}>
        <div className="d-flex gap-3 align-items-center">
        <Link to={'/hostel'}>
          <h4 className="brand-name d-flex" >
          <RiMenu2Line className="me-3 menu-icon" onClick={()=>dispatch({type:"TOGGLE-ADMIN-SIDEBAR"})}/>
            HostelWeb</h4>
            </Link>
        </div>
        { window.location.pathname!=="/admin" &&
          <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="search-box">
            <input type="text" value={searchQuery} onChange={(e)=>dispatch({type:"SET-SEARCH-QUERY", payload:e.target.value})} placeholder="search..." />
            <button>
              <FiSearch />
            </button>
          </div>

        </div>}

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
