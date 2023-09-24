import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import mySwal from '../../utils/sweetalert';
import toast from "react-hot-toast";
import {RiMore2Fill} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';




function HostelTable() {
  const {searchQuery} = useSelector((state)=>state.common)
    const [hostelData, setHostelData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
      
        const fetchData = async () => {
          try {
            const response = await axios.get("/admin/hostel");
            const hostels = await response.data;
            if(hostels){
    
                setHostelData(hostels);
            }
            console.log("response:", hostels); 
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
        
      },[refresh]);

      const handleStatus= async (status,id, index)=>{
        const {isConfirmed} =  await mySwal.confirm("Are You sure "+status)
        if(!isConfirmed) return;
        try {
          const {data} = await axios.patch("/admin/hostel/registerStatus",{stat:status,id});
          if(!data.err){
            const hostels=hostelData;
            hostels[index].isApproved=status
            setHostelData([...hostels])  
            toast.success("Successfully "+status) 
            setRefresh(!refresh)         
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error.message);
          toast.error("something went wromg")
        }
      }
      const handleListing= async (listing,id, index)=>{
        const {isConfirmed} =  await mySwal.confirm("Are You sure ")
        if(!isConfirmed) return;
        try {
          const {data} = await axios.patch("/admin/hostel/listingStatus",{listing:listing,id});
          if(!data.err){
            const hostels=hostelData;
            hostels[index].isBlocked=listing
            setHostelData([...hostels])  
            setRefresh(!refresh) 
            toast.success("Successfully changed status")          
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error.message);
          toast.error("something went wromg")
        }
      }
      

  return (<MDBContainer className='pt-3' >
        <h4 className='mt-2 mb-3 ms-1'>Hostels</h4>
        <div className='table-responsive'>

    <MDBTable align='middle' striped>
      <MDBTableHead className='' style={{backgroundColor:"#E7E7E7"}}>
        <tr>
          <th className='fw-bold' scope='col'>Name</th>
          <th className='fw-bold' scope='col'>Location</th>
          <th className='fw-bold' scope='col'>Description</th>
          <th className='fw-bold' scope='col'>Hostel Type</th>
          <th className='fw-bold' scope='col'>Status</th>
          <th className='fw-bold' scope='col'>Change status</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {hostelData
      .filter(item=>item.hostelName.match(new RegExp(searchQuery, 'i')))
      .map((hostel, index) => 
        <tr key={index}>
          <td >
            <div  className='d-flex align-items-center'>
              <img
                src={hostel?.hostelImage?.url ?? 'https://media-cdn.tripadvisor.com/media/photo-s/05/33/47/86/tigon-hostel.jpg'}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{hostel.hostelName}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{hostel.location}</p>
          </td>
          <td>{hostel.description}</td>
          <td>
           {hostel.hostelType}
          </td>
          <td>
            <MDBBadge color={
              hostel?.isApproved==="Pending" || hostel.isBlocked===true ? 'warning' :
              hostel?.isApproved==="Approved" ? 'success':"danger"} pill>

              {
                hostel?.isApproved==="Approved" ? hostel.isBlocked===false ? 'Listed' : 'Unlisted':hostel.isApproved
                
              }
            </MDBBadge>
          </td>
          <td className=''>
            {/* <div className='d-flex justify-content-center'>

            {
            hostel?.isApproved==="Pending" ? <>
            <MDBBtn className='m-1' size='sm' rounded onClick={()=>handleStatus('Approved',hostel._id, index)}>Approve</MDBBtn>
            <MDBBtn className='m-1' rounded style={{backgroundColor:"#DC4C64"}} onClick={()=>handleStatus('Rejected',hostel._id, index)}>Reject</MDBBtn>
            </>
            : <MDBBadge color={
              hostel?.isApproved==="Rejected" ? 'danger' :'success'} pill>

              {
                hostel?.isApproved
              }
            </MDBBadge>
          }
            </div> */}
            <MDBDropdown>
        <MDBDropdownToggle className='transparent-btn drop-btn'>
          <RiMore2Fill className={''}/>
        </MDBDropdownToggle>
        
        {
          hostel?.isApproved==="Pending" ?
          <MDBDropdownMenu>
          <MDBDropdownItem link onClick={()=>handleStatus('Approved',hostel._id, index)}>Approve</MDBDropdownItem>
          <MDBDropdownItem link onClick={()=>handleStatus('Rejected',hostel._id, index)}>Reject</MDBDropdownItem>
        </MDBDropdownMenu>
       :hostel.isBlocked===false?
       <MDBDropdownMenu>
         <MDBDropdownItem link onClick={()=>handleListing("true",hostel._id, index)}>UnList</MDBDropdownItem>
       </MDBDropdownMenu>
         :
       <MDBDropdownMenu>
         <MDBDropdownItem link onClick={()=>handleListing("false",hostel._id, index)}>List</MDBDropdownItem>
         </MDBDropdownMenu>
       }
     </MDBDropdown>
          </td>
       
        </tr>)}
       
      </MDBTableBody>
    </MDBTable>
        </div>
  </MDBContainer  >
  );
}

export default HostelTable;