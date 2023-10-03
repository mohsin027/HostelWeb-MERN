import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import AddComplaintModal from '../../modal/AddComplaintModal';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

export default function UserComplaints() {
  const { user } = useSelector((state) => state.auth.user);
  const {hostels}=useSelector((state) => state.common.hostels)
  const [open, setOpen] = useState(false);
  const [complaintsData, setComplaintsData] = useState([]);

  const fetchData=async()=>{
    const response = await axios.get('/user/getComplaints',{params:{userId:user._id}})
    const complaints=response.data.complaints
    setComplaintsData(complaints)
  }

  useEffect(()=>{
    fetchData()
  },[open])

  console.log('user',user,'hostels',hostels);
  return (
    <section className='container pb-3'>
      <MDBCard className=''>
        <MDBCardHeader className='d-flex justify-content-between '>
          <MDBCardTitle>

          Complaints
          </MDBCardTitle>
          <MDBBtn onClick={()=>setOpen(true)}>Register Complaint</MDBBtn>
        </MDBCardHeader>
        <MDBCardBody>
        <MDBTable>
            <MDBTableHead>
              <tr style={{ fontSize: "1.1rem" }}>
                <th>Date</th>
                <th>Complaint Type</th>
                <th>Description</th>
                <th>Ref Hostel</th>
                <th>status</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {complaintsData?.map((complaint, index) => (
                <tr key={complaint._id}>
                  <td>{moment(complaint.createdAt).format("YYYY-MM-DD")}</td>
                  <td>{complaint.complaintType}</td>
                  <td>{complaint.complaintDescription}</td>
                  <td>{complaint.hostelId?.hostelName || "na"}</td>
                  <td className="d-flex">
                    {complaint.status || "na"}

                    
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
      <AddComplaintModal open={open} setOpen={setOpen} user={user} hostels={hostels}/>
    </section>
  )
}