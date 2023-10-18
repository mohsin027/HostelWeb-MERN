import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';



function UserTable() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/");
            const userdata = await response.data;
            if(userdata){
    
              setUser(userdata);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
        
      },[]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
      {user.map((user) => 
      
        <tr>
          <td>1</td>
          <td>name</td>
          <td>{user.email}</td>
          <td>@mdo</td>
        </tr>

      )}
       
      </tbody>
    </Table>
  );
}

export default UserTable;