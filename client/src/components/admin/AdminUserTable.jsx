import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import mySwal from '../../utils/sweetalert';
import toast from "react-hot-toast";
import {RiMore2Fill} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';




export default function UserTable() {
  const {searchQuery} = useSelector((state)=>state.common)
    const [userData, setUserData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
      
        const fetchData = async () => {
          try {
            const response = await axios.get("/admin/users");
            const users = await response.data;
            if(users){
    
                setUserData(users);
            }
            console.log("response:", users); 
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
          const {data} = await axios.patch("/admin/user/activeStatus",{stat:status,id});
          if(!data.err){
            const users=userData;
            users[index].isBlocked=status
            setUserData([...users])  
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
      

  return (<MDBContainer className='pt-3' >
        <h4 className='mt-2 mb-3 ms-1'>Hostels</h4>
        <div className='table-responsive'>

    <MDBTable align='middle' striped>
      <MDBTableHead className='' style={{backgroundColor:"#E7E7E7"}}>
        <tr>
          <th className='fw-bold' scope='col'>Name</th>
          <th className='fw-bold' scope='col'>Email</th>
          <th className='fw-bold' scope='col'>Gender</th>
          <th className='fw-bold' scope='col'>Phone</th>
          <th className='fw-bold' scope='col'>Status</th>
          <th className='fw-bold' scope='col'>Change status</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {userData
      .filter(item=>item.fullName?.match(new RegExp(searchQuery, 'i')))
      .map((user, index) => 
        <tr key={index}>
          <td >
            <div  className='d-flex align-items-center'>
              <img
                src={user?.userImage?.url ?? 'https://www.freepik.com/icon/man_4140037#fromView=keyword&term=User&page=1&position=87'}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{user.fullName}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{user.email}</p>
          </td>
          <td>{user.gender}</td>
          <td>
           {user.contactNumber}
          </td>
          <td>
            <MDBBadge color={
              user?.isBlocked===true ? 'danger' : 'success'} pill>

              {
                user?.isBlocked?"blocked":'active'
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
          <RiMore2Fill />
        </MDBDropdownToggle>
        
        
          <MDBDropdownMenu>
            {user.isBlocked!==true?
          <MDBDropdownItem link onClick={()=>handleStatus('true',user._id, index)} >Block</MDBDropdownItem>
          :
          <MDBDropdownItem link  onClick={()=>handleStatus('false',user._id, index)}>UnBlock</MDBDropdownItem>
        }
        </MDBDropdownMenu>
      </MDBDropdown>
          </td>
        </tr>)}
       
      </MDBTableBody>
    </MDBTable>
        </div>
  </MDBContainer  >
  );
}
