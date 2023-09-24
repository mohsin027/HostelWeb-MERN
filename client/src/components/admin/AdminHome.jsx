import React from 'react'
import AdminNavbar from './AdminNavbar'
import Sidebar from '../../pages/admin/Sidebar'

export default function AdminHome() {
  return (
    <>
    <AdminNavbar />
    <div className='d-flex'>
    <Sidebar className="sidebar"></Sidebar>
    <p>admin home</p>
    </div>
    {/* <DashboardLayout/> */}
    </>
  )
}
