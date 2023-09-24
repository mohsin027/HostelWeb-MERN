import React, { useEffect, useState } from "react";
import HostelHome from "../../components/hostel/HostelHome";
import Sidebar from "../../components/hostel/Sidebar";
import HostelNavbar from "../../components/hostel/HostelNavbar";
import HeroImage from "../../components/hostel/hero";
import { useSelector } from "react-redux";
import axios from "axios";

export default function HostelHomePage() {
  const [hostelCheck, setHostelCheck] = useState("");

  const { hostel } = useSelector((state) => state.auth.hostel);
  console.log("hero", hostel);
  const checkHostel = async () => {
    try {
      const response = await axios.post("/hostel/hostel/check", {
        adminData: hostel._id,
      });
      const { isHostel } = response.data;
      setHostelCheck(isHostel);
      console.log(isHostel, "hostel chweck");
    } catch (error) {
      console.log(error, "hostel chweck error");
    }
  };
  useEffect(() => {
    checkHostel();
  }, []);

  return (
    <>
      <HostelNavbar></HostelNavbar>
        {/* <HostelSidebar /> */}
      <div className="d-flex">
        <Sidebar></Sidebar>
        {
        hostelCheck.length!==0 ? <HostelHome/>: <HeroImage/>
      }
      </div>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import HostelNavbar from "../../components/hostel/HostelNavbar";
// import HeroImage from "../../components/hostel/hero";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import HostelTable from "../../components/hostel/HostelTable";
// import Sidebar from "../../components/hostel/Sidebar";

// export default function HostelHome({}) {
//   const [hostelCheck, setHostelCheck] = useState("");

//   const { hostel } = useSelector((state) => state.auth.hostel);
//   console.log("hero", hostel);
//   const checkHostel = async () => {
//     try {
//       const response = await axios.post("/hostel/hostel/check", {
//         adminData: hostel._id,
//       });
//       const { isHostel } = response.data;
//       setHostelCheck(isHostel);
//       console.log(isHostel, "hostel chweck");
//     } catch (error) {
//       console.log(error, "hostel chweck error");
//     }
//   };
//   useEffect(() => {
//     checkHostel();
//   }, []);

//   return (
//     <>
//       <HostelNavbar></HostelNavbar>
//       <Sidebar></Sidebar>
//       {/* <HostelSidebar /> */}
//       {hostelCheck ? (
//         <HostelTable data={hostelCheck} />
//       ) : (
//         <HeroImage></HeroImage>
//       )}
//     </>
//   );
// }
