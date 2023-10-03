import React from 'react'
// import AdminNavbar from './AdminNavbar'
// import Sidebar from '../../pages/admin/Sidebar'
import AdminComplaints from '../../components/admin/AdminComplaints'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from './Sidebar'

export default function AdminComplaintsPage() {
  return (
    <>
    <AdminNavbar />
    <div className='d-flex'>
    <Sidebar className="sidebar"></Sidebar>
<AdminComplaints/>
    </div>
    {/* <DashboardLayout/> */}
    </>
  )
}
