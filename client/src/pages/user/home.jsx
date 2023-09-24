import axios from "axios";
import React, {  useEffect, useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import HomeCarousel from "./Carosal"
import NavMain from "../../components/user/Navbar";
import { MDBContainer } from "mdb-react-ui-kit";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import UserNavbar from '../../components/user/UserNavbar'
import HostelListing from "../../components/user/HostelListing";




function Home() {
  const {searchQuery} = useSelector((state)=>state.common)
  const [user, setUser] = useState([]);
  const [hostel, setHostel] = useState([]);
  const dispatch=useDispatch()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get("/user/hostel");
        if(data){
          setHostel(data.hostels);
        }
        dispatch({type:"SET-HOSTEL-DATA",payload:data});
        console.log("response:", data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[]);

  return (
    <>
 
      {/* <NavMain /> */}
      <UserNavbar/>
    <HomeCarousel/>
    <MDBContainer>

    <Row className=" m-2 mt-5">
      <h1>Hostel listings</h1>

        {hostel.filter(item=>item.hostelName.match(new RegExp(searchQuery, 'i'))).map((i,index)=>
        
      <Col key={index} md={4} className="mt-3">
          <HostelListing data={i}/>
      </Col>
        )}
    </Row>
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
