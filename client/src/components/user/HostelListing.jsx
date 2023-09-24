import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';
  import hostelImage from '../../images/hostel.jpg'
import { Link } from 'react-router-dom';

export default function HostelListing ({data}) {
  return (
    <div>
            <MDBCard >
      <MDBCardImage style={{height:"17rem"}} src={data.hostelImage?.url || hostelImage} position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle>{data.hostelName}</MDBCardTitle>
        <MDBCardText>
          {data.description}
        </MDBCardText>
          <Link to={'/view/hostel/'+data._id} state={data}>
        <MDBBtn rounded >

          View more
          </MDBBtn>
          </Link>
      </MDBCardBody>
    </MDBCard>
    </div>
  )
}
