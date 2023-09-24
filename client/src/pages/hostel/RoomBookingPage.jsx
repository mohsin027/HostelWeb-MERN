import React from 'react'
import BookingTable from '../../components/hostel/BookingTable'
import HostelNavbar from '../../components/hostel/HostelNavbar'
import Sidebar from '../../components/hostel/Sidebar'

export default function RoomBookingPage() {
  return (
    <>
    <HostelNavbar/>
    <div className='d-flex'>
        <Sidebar/>
<BookingTable></BookingTable>
    </div>
    </>
  )
}
