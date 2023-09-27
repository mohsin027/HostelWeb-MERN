import React from 'react'
import AdminNavbar from './AdminNavbar'
import Sidebar from '../../pages/admin/Sidebar'
import AdminDashboard from './AdminDashboard'

export default function AdminHome() {
  return (
    <>
    <AdminNavbar />
    <div className='d-flex'>
    <Sidebar className="sidebar"></Sidebar>
    <AdminDashboard></AdminDashboard>
    </div>
    {/* <DashboardLayout/> */}
    </>
  )
}
