import React, { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/user/home";
import UserLogin from "../pages/user/UserLogin";
import UserRegister from "../pages/user/UserRegister";
import { useDispatch, useSelector } from "react-redux";
import NavMain from "../components/user/Navbar";
import axios from 'axios';
import { HostelDetailPage } from "../pages/user/HostelDetailPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import RoomBookingSuccessPage from "../pages/user/RoomBookingSuccessPage";

const UserRoutes = () => {
  const { user, userRefresh } = useSelector((state) => state.auth);
  useEffect(() => {
    checkUserLoggedIn();
  }, [userRefresh]);
  const dispatch = useDispatch();
  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get("/user/auth/login/check");
      dispatch({ type: "SET-USER", payload: data });
    } catch (e) {
    console.log("error", e)
      dispatch({ type: "SET-USER", payload: { loggedIn: false } });
    }
  };
  console.log(user)

  return (
    <>
      <Routes>
        {user?.login && (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/"  />} />
            <Route  path="/view/hostel/:hostelId" element={<HostelDetailPage/>} />
            <Route  path="/view/bookRoom" element={<RoomBookingSuccessPage/>} />
            <Route  path="/user/profile" element={<UserProfilePage></UserProfilePage>} />
            <Route  path="/" element={<Home />} />
          </>
        )}
        {user?.login===false && (
          <>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default UserRoutes;
