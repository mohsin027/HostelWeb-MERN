import React from 'react'
import HostelTable from '../../components/hostel/HostelTable'
import HostelNavbar from '../../components/hostel/HostelNavbar'
import Sidebar from '../../components/hostel/Sidebar'

export default function HosteTablePage() {
  return (
    <>
    <HostelNavbar/>
    <div className='d-flex'>
        <Sidebar/>
        <HostelTable/>
    </div>
    </>
  )
}
