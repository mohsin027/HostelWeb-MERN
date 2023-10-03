import React, { useEffect } from 'react'
import UserProfile from '../../components/user/UserProfile'
import NavMain from '../../components/user/UserNavbar'
import BookingDetails from '../../components/user/BookingDetails'
import UserComplaints from '../../components/user/UserComplaints'

export default function UserProfilePage() {
  useEffect(()=>{

  },[BookingDetails])
  return (
    <div style={{ backgroundColor: '#eee',height:'100%' }}>
      <NavMain/>
      <UserProfile/>
      <BookingDetails/>
      <UserComplaints/>
    </div>
  )
}
