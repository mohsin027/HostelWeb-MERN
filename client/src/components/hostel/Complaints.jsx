import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import AddComplaintModal from '../../modal/AddComplaintModal';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Complaints() {
  const { user } = useSelector((state) => state.auth.user);
//   const {hostels}=useSelector((state) => state.common.hostels)
  const { hostel } = useSelector((state) => state.auth.hostel);
  const [open, setOpen] = useState(false);
  const [complaintsData, setComplaintsData] = useState([]);

  const fetchData=async()=>{
    const response = await axios.get('/hostel/hostel/getComplaints',{params:{hostelAdminId:hostel._id}})
    const complaints=response.data.complaints
    setComplaintsData(complaints)
  }

  useEffect(()=>{
    fetchData()
  },[open])

  console.log('user',user,'hostels',hostel);
  return (
    <section className='container'>
      <MDBCard>
        <MDBCardHeader className='d-flex justify-content-between'>
          <MDBCardTitle>

          Complaints
          </MDBCardTitle>
          {/* <MDBBtn onClick={()=>setOpen(true)}>Register Complaint</MDBBtn> */}
        </MDBCardHeader>
        <MDBCardBody>
          <MDBTable>
            <MDBTableHead>
              <tr>

                <th>Complaint Type</th>
                <th>Description</th>
                <th>Ref Hostel</th>
                <th>status</th>
              </tr>
                
            </MDBTableHead>
            <MDBTableBody>
              {
                complaintsData?.map((complaint)=>
                <tr>
                  <td>
                    {complaint.complaintType}
                  </td>
                  <td>
                    {complaint.complaintDescription}
                  </td>
                  <td>
                    {complaint.hostelId?.hostelName || 'na'}
                  </td>
                  <td>
                    {complaint.status || 'na'}
                  </td>
                </tr>
                )
              }
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
      {/* <AddComplaintModal open={open} setOpen={setOpen} user={user} hostels={hostels}/> */}
    </section>
  )
}
