import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import HomeCarousel from "./Carosal";
import NavMain from "../../components/user/Navbar";
import { MDBBtn, MDBContainer, MDBInput } from "mdb-react-ui-kit";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import UserNavbar from "../../components/user/UserNavbar";
import HostelListing from "../../components/user/HostelListing";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";

function Home() {
  const { searchQuery } = useSelector((state) => state.common);
  const [user, setUser] = useState([]);
  // const [hostel, setHostel] = useState([]);
  const [hostelData, setHostelData] = useState([]);
  const [genderFilter, setGenderFilter] = useState("all");
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/user/hostel", {
          params: { skip: (page - 1) * limit, limit },
        });
        const data = await response.data.hostelList;
        const count = await response.data.count;
        if (data) {
          setHostelData(data);
        }
        if (count) {
          setCount(Math.ceil(count / limit));
        }
        dispatch({ type: "SET-HOSTEL-DATA", payload: data });
        console.log("response:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [genderFilter, refresh, page, limit]);

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

  const filteredHostelData = hostelData.filter((hostel) => {
    if (filter === "all") {
      return true;
    } else if (filter === "men") {
      return hostel.hostelType === "men";
    } else if (filter === "women") {
      return hostel.hostelType === "women";
      // } else if (filter === "listed") {
      //   return hostel.isApproved === "Approved" && !hostel.isBlocked;
      // } else if (filter === "unlisted") {
      //   return hostel.isApproved === "Approved" && hostel.isBlocked;
    }
    return true;
  });
  console.log("filteredHostelData", filteredHostelData);

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
              <div>
                <span className="h5">Filter by:</span>
                <MDBBtn
                  color={filter === "all" ? "primary" : "light"}
                  onClick={() => setFilter("all")}
                >
                  All
                </MDBBtn>
                <MDBBtn
                  color={filter === "men" ? "primary" : "light"}
                  onClick={() => setFilter("men")}
                >
                  Gents
                </MDBBtn>
                <MDBBtn
                  color={filter === "women" ? "primary" : "light"}
                  onClick={() => setFilter("women")}
                >
                  Ladies
                </MDBBtn>
              </div>
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

          {filteredHostelData
            .filter((item) =>
              // item.hostelName.match(new RegExp(searchQuery, "i"))
              genderFilter !== "all"
                ? item.hostelType === genderFilter &&
                  (item.hostelName.match(new RegExp(searchQuery, "i")) ||
                    item.location.match(new RegExp(searchQuery, "i")) ||
                    item.hostelType.match(new RegExp(searchQuery, "i")))
                : item.hostelName.match(new RegExp(searchQuery, "i")) ||
                  item.location.match(new RegExp(searchQuery, "i")) ||
                  item.hostelType.match(new RegExp(searchQuery, "i"))
            )
            .map((i, index) => (
              <Col key={index} md={4} className="mt-3">
                <HostelListing data={i} />
              </Col>
            ))}
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
