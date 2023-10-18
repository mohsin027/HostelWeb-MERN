import React, { useEffect, useState } from "react";
import HostelHome from "../../components/hostel/HostelHome";
import Sidebar from "../../components/hostel/Sidebar";
import HostelNavbar from "../../components/hostel/HostelNavbar";
import HeroImage from "../../components/hostel/hero";
import { useSelector } from "react-redux";
import axios from "axios";

export default function HostelHomePage() {
  const [hostelCheck, setHostelCheck] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { hostel } = useSelector((state) => state.auth.hostel);
  const checkHostel = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/hostel/hostel/check", {
        params: { adminData: hostel._id },
      });
      const isHostel = response.data.hostelList;
      setHostelCheck(isHostel);
      setIsLoading(false);
    } catch (error) {
      console.log(error, "hostel chweck error");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkHostel();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center">
          <h4 className="d-flex align-items-center justify-content-center">
          Loading......

          </h4>
        </div>
      ) : (
        <>
          <HostelNavbar></HostelNavbar>
          {/* <HostelSidebar /> */}
          <div className="d-flex">
            <Sidebar></Sidebar>
            {hostelCheck.length !== 0 ? <HostelHome /> : <HeroImage />}
          </div>
        </>
      )}
    </>
  );
}

