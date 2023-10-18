import axios from "axios"




export async function getHostelDetails(hostelId) {
    const response =await axios.get("/user/rooms/"+hostelId);
    return response
}
export async function getComplaintsByUser(userId) {
    const response =await axios.get('/user/getComplaints',{params:{userId}})
    return response
}


