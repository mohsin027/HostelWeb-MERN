import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import UserRoutes from "./routes/userRoutes";
import HostelRoutes from "./routes/hostelRoutes";
import { Toaster } from "react-hot-toast";
import AdminRoutes from "./routes/adminRoutes";
import { ChakraProvider } from '@chakra-ui/react'



function App() {
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  axios.defaults.withCredentials = true;
  return (
      <ChakraProvider >
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <div className="main-container">
          <Routes>
            <Route path="/hostel/*" element={<HostelRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/*" element={<UserRoutes />} />
          </Routes>
        </div>
      </Router>
    </div>
      </ChakraProvider>
  );
}

export default App;
