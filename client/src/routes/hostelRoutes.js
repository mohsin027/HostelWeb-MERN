import React, {useEffect} from 'react'
import { Routes, Route, Navigate } from'react-router-dom'
import HostelRegisterPage from '../pages/hostel/HostelRegisterPage'
import {useSelector, useDispatch} from 'react-redux'
import NavMain from '../components/user/Navbar'
import axios from 'axios'
import HostelLoginPage from '../pages/hostel/HostelLoginPage'
import HostelHome from '../components/hostel/HostelHome'
import HostelHomePage from '../pages/hostel/HostelHomePage'
import HosteTablePage from '../pages/hostel/HosteTablePage'
import RoomHomePage from '../pages/hostel/RoomHomePage'
import RoomBookingPage from '../pages/hostel/RoomBookingPage'
// import { AddHostelPage } from '../pages/hostel/AddHostelPage'


const HostelRoutes = () => {
  const { hostel, hostelRefresh } = useSelector((state) => state.auth);
  useEffect(() => {
    checkHostelLoggedIn();
  }, [hostelRefresh]);
  const dispatch = useDispatch();
  const checkHostelLoggedIn = async () => {
    try {
      const { data } = await axios.get("/hostel/auth/login/check");
      dispatch({ type: "SET-HOSTEL", payload: data });
      console.log(data,'HRCUL');
    } catch (e) {
    console.log("error", e)
      dispatch({ type: "SET-HOSTEL", payload: { loggedIn: false } });
    }
  };
  console.log(hostel,'hostel admin auth')
  return (
    <>
    <Routes>
      {hostel?.login && (
        <>
          <Route path="/login" element={<Navigate to="/hostel" />} />
          <Route path="/register" element={<Navigate to="/hostel"  />} />

          <Route path="/hostel/:hostelId" element={<RoomHomePage />} />
          <Route path="/hostels" element={<HosteTablePage />} />
          <Route path="/bookings" element={<RoomBookingPage/>} />
          <Route path="/" element={<HostelHomePage />} />
        </>
      )}
      {hostel?.login===false && (
        <>
          <Route path="/login" element={<HostelLoginPage />} />
          <Route path="/register" element={<HostelRegisterPage />} />
          <Route path="/*" element={<Navigate to="/hostel/login" />} />
        </>
      )}
    </Routes>
  </>
  )
}

export default HostelRoutes