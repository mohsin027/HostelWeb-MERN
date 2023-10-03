import React from 'react'
import HostelNavbar from '../../components/hostel/HostelNavbar'
import Sidebar from '../../components/hostel/Sidebar'
import Complaints from '../../components/hostel/Complaints'

export default function HostelComplaintPage() {
  return (
    <>
    <HostelNavbar/>
    <div className='d-flex'>
        <Sidebar/>
        <Complaints/>
    </div>
    </>
  )
}
