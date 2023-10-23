import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AdminLogin from "../components/admin/AdminLogin";
import AdminHome from "../components/admin/AdminHome";
import AdminHostels from "../components/admin/AdminHostels";
import AdminUsers from "../components/admin/AdminUsers";
import AdminComplaintsPage from "../pages/admin/AdminComplaintsPage";

const AdminRoutes = () => {
  const { admin, adminRefresh } = useSelector((state) => state.auth);
  useEffect(() => {
    checkAdminLoggedIn();
  }, [adminRefresh]);
  const dispatch = useDispatch();
  const checkAdminLoggedIn = async () => {
    try {
      const { data } = await axios.get("/admin/auth/login/check");
      dispatch({ type: "SET-ADMIN", payload: data });
    } catch (e) {
      console.log("error", e);
      dispatch({ type: "SET-ADMIN", payload: { loggedIn: false } });
    }
  };

  return (
    <>
      <Routes>
        {admin?.login && (
          <>
            <Route path="/login" element={<Navigate to="/admin/" />} />
            <Route exact path="/" element={<AdminHome />} />
            <Route exact path="/hostels" element={<AdminHostels />} />
            <Route exact path="/users" element={<AdminUsers />} />
            <Route exact path="/complaints" element={<AdminComplaintsPage />} />
          </>
        )}
        {admin?.login === false && (
          <>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/*" element={<Navigate to="/admin/login" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AdminRoutes;
