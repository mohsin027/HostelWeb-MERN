import React from 'react'
import AdminNavbar from './AdminNavbar'
import HostelTable from './AdminHostelTable'
import Sidebar from '../../pages/admin/Sidebar'

export default function AdminHostels() {
  return (
    <>
    <AdminNavbar />
    <div className='d-flex'>
    <Sidebar className="sidebar"></Sidebar>
    <HostelTable></HostelTable>
    </div>
    {/* <DashboardLayout/> */}
    </>
  )
}
