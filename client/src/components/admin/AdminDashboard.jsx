import axios from "axios";
import {
  MDBBadge,
  MDBCard,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState({
    hostelCount: 0,
    userCount: 0,
    bookingCount: 0,
    activeBookingsCount: 0,
  });
  const fetchData = async () => {
    const response = await axios.get(`/admin/data`);
    const hostelCount = response.data.hostelCount;
    const userCount = response.data.userCount;
    const bookingCount = response.data.bookingCount;
    const activeBookingsCount = response.data.activeBookingsCount;
    console.log("data in dashboard", hostelCount);
    setData({
      ...data,
      hostelCount: hostelCount,
      userCount,
      bookingCount,
      activeBookingsCount,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex p-4 w-100">
      <div className="row g-6 w-100 mb-6">
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card shadow border-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                    Total Hostels
                  </span>
                  <span className="h3 font-bold mb-0">{data.hostelCount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                    <i className="bi bi-credit-card" />
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                {/* <span className="badge badge-pill bg-soft-success text-success me-2">
                  <i className="bi bi-arrow-up me-1" />
                  13%
                </span>
                <span className="text-nowrap text-xs text-muted">
                  Since last month
                </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card shadow border-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                    Total Users
                  </span>
                  <span className="h3 font-bold mb-0">{data.userCount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                    <i className="bi bi-people" />
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                {/* <span className="badge badge-pill bg-soft-success text-success me-2">
                  <i className="bi bi-arrow-up me-1" />
                  30%
                </span>
                <span className="text-nowrap text-xs text-muted">
                  Since last month
                </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card shadow border-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                    Total booking count
                  </span>
                  <span className="h3 font-bold mb-0">{data.bookingCount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                    <i className="bi bi-clock-history" />
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                {/* <span className="badge badge-pill bg-soft-danger text-danger me-2">
                  <i className="bi bi-arrow-down me-1" />
                  -5%
                </span>
                <span className="text-nowrap text-xs text-muted">
                  Since last month
                </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card shadow border-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                    Active Bookings
                  </span>
                  <span className="h3 font-bold mb-0">{data.activeBookingsCount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                    <i className="bi bi-minecart-loaded" />
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                {/* <span className="badge badge-pill bg-soft-success text-success me-2">
                  <i className="bi bi-arrow-up me-1" />
                  10%
                </span>
                <span className="text-nowrap text-xs text-muted">
                  Since last month
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
