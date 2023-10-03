import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import HomeCarousel from "./Carosal";
import NavMain from "../../components/user/Navbar";
import { MDBBtn, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import UserNavbar from "../../components/user/UserNavbar";
import HostelListing from "../../components/user/HostelListing";
import { Select } from "antd";
import "./home.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Typography,
} from "@mui/material";
import mySwal from "../../utils/sweetalert";
import { useNavigate } from "react-router-dom";

function Home() {
  const { searchQuery } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth.user);
  // const [hostel, setHostel] = useState([]);
  const [hostelData, setHostelData] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [locations, setLocations] = useState([])
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    gender:"",
    sharing:"",
    location:"",
  });
  const navigate = useNavigate();


  useEffect(() => {
    if (!user.gender) {
      // window.alert("Please update your gender");
      mySwal.alert("Update Profile", "Please update your gender");
      navigate("/user/profile");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get("/user/hostel", {
          params: { skip: (page - 1) * limit, limit, ...filter },
        });
        const data = await response.data.hostelList;
        const count = await response.data.count;
        if (data) {
          setHostelData(data);
        }

        if (count) {
          setCount(Math.ceil(count / limit));
        }
        let hostelLocations = response.data.locations.map((hostel)=>{
          return hostel.location.toLowerCase().trim()
        })
      
        hostelLocations= new Set(hostelLocations)

        let locationsArray=[ ...hostelLocations].map((location)=>{
          return {label:location, value:location}
        });
      
        setLocations([{value:"", label:"All"}, ...locationsArray])
        dispatch({ type: "SET-HOSTEL-DATA", payload: data });
        console.log("response:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [genderFilter, refresh, page, limit, filter]);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value) {
      setGenderFilter(e.target.value);
      setRefresh(!refresh);
    } else {
      setGenderFilter("");
    }
  };
  const handlePageChange = async (event, value) => {
    setPage(value);

    setSkip(page * limit);

    console.log("skip", skip);
    setRefresh(!refresh);
  };
  console.log("value", "page", page);
  const handleItemsPerPage = async (e) => {
    setLimit(e.target.value);

    console.log(e.target.value);
    setRefresh(!refresh);
  };



  const shares=[
    {
      value:"",
      label:"All"
    },
    {
      value:"1",
      label:"Single"
    },
    {
      value:"2",
      label:"Two sharing"
    },
    {
      value:"3",
      label:"Three sharing"
    },
    {
      value:"4",
      label:"Four sharing"
    }

  ]



  // function filterByGender(hostel){
  //   if(hostel.hostelType==filter.gender || filter.gender==""){
  //     return true
  //   }
  //   return false
  // }
  // function filterByLocation(hostel){
  //   if(hostel.location==filter.location || filter.location==""){
  //     return true
  //   }
  //   return false
  // }
  // function filterBySharing(hostel){

  //   if(filter.sharing==""){
  //     return true
  //   }
  //   const roomFound = hostel.rooms.find((room)=>room.capacity==filter.sharing);
  //   if(roomFound){
  //     return true
  //   }
  //   return false
  // }
  function filterBySearch(hostel){
    if(hostel.hostelName.match(new RegExp(searchQuery, "i")) ||
    hostel.location.match(new RegExp(searchQuery, "i")) ||
    hostel.hostelType.match(new RegExp(searchQuery, "i"))
    ){
      return true
    }
    return false
  }


  const filteredHostelData = hostelData.filter((hostel) => {
      return ( 
        // filterByGender(hostel) &&
        // filterBySharing(hostel) &&
        // filterByLocation(hostel) &&
        filterBySearch(hostel) 
      ) 
  });
  // console.log("filteredHostelData", filteredHostelData);

  // useEffect(()=>{
  //   if(filteredHostelData.length===0 && page<count ){
  //     setPage(page+1)
  //   }
  // },[filteredHostelData])

  return (
    <>
      {/* <NavMain /> */}
      <UserNavbar />
      <HomeCarousel />
      <MDBContainer>
        <Row className=" m-2 mt-5" style={{ minHeight: "500px" }}>
          <div className="d-flex justify-content-between">
            <Typography variant="h3">Hostel listings</Typography>
            <div className="d-flex align-items-center">
             
              {/* <Typography className="mt-3">Filter by</Typography>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Hostel Type</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  // value={age}
                  name="gender"
                  label="Age"
                  onChange={handleChange}
                >
                   <MenuItem value="all">
                  <em>All</em>
                  </MenuItem>
                  <MenuItem value="men">Gents</MenuItem>
                  <MenuItem value="women">Ladies</MenuItem>
                </Select>
              </FormControl> */}
            </div>
          </div>
          <div className="hostel-listing-container">
            <div className="hostel-listing-filter">
              <div className="d-flex flex-column">
                <span className="h6">Filter by:</span>
                <div className="d-flex gap-1">
                  <MDBBtn
                    size="sm"
                    color={filter.gender === "" ? "primary" : "light"}
                    onClick={() => setFilter({...filter, gender:""})}
                  >
                    All
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color={filter.gender === "men" ? "primary" : "light"}
                    onClick={() => setFilter({...filter, gender:"men"})}
                  >
                    Gents
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color={filter.gender === "women" ? "primary" : "light"}
                    onClick={() => setFilter({...filter, gender:"women"})}
                  >
                    Ladies
                  </MDBBtn>
                </div>
              </div>
              <div className="d-flex flex-column">
                <span className="h6">Location </span>
                <div className="">
                  <Select
                    value={filter.location}
                    onChange={(data)=>{
                      setFilter({
                        ...filter,
                        location: data
                      })
                    }}
                    style={{
                      width: "100%",
                    }}
                    options={locations}
                  />
                </div>
              </div>
              <div className="d-flex flex-column">
                <span className="h6">Room Shares </span>
                <div className="">
                  <Select
                    
                    // size={size}
                    // defaultValue="a1"
                    value={filter.sharing}
                    onChange={(data)=>{
                      setFilter({
                        ...filter,
                        sharing: data
                      })
                    }}
                    style={{
                      width: "100%",
                    }}
                    options={shares}
                  />
                </div>
              </div>
            </div>
            <div>
              <MDBContainer>
                <MDBRow>
                  {filteredHostelData.map((i, index) => (
                        <Col key={index} md={4} className="mb-3 p-2">
                          <HostelListing data={i} />
                        </Col>
                    ))}
                </MDBRow>
              </MDBContainer>
            </div>
          </div>
        </Row>
        <div className="d-flex justify-content-between my-4">
          <Pagination count={count} page={page} onChange={handlePageChange} />
          <div className="d-flex w-10 align-items-center">
            <p className="m-2">view</p>
            <select name="" id="" onChange={handleItemsPerPage}>
              <option value={5}>5</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <p className="m-2">items</p>
          </div>
        </div>
      </MDBContainer>
    </>
    // <div>

    //   <h1>Hostel Management App</h1>
    //   { <div>
    //     <h2>Welcome</h2>

    //         </div>
    //   }

    // </div>
  );
}

export default Home;
