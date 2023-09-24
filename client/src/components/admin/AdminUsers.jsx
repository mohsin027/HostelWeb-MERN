import React from 'react'
import AdminNavbar from './AdminNavbar'
import Sidebar from '../../pages/admin/Sidebar'
import UserTable from './AdminUserTable'

export default function AdminUsers() {
  return (
    <>
    <AdminNavbar />
    <div className='d-flex'>
    <Sidebar className="sidebar"></Sidebar>
    <UserTable/>
    </div>
    {/* <DashboardLayout/> */}
    </>
  )
}
