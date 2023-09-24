import HostelModel from "../models/hostelModel.js";
import UserModel from "../models/userModel.js";



export const getAllHostel=  async (req, res) => {
    try {
      const hostelList = await HostelModel.find().sort({_id:-1}); 
      res.status(201).json(hostelList);
    } catch (error) {
      console.error('Error getting hostel:', error);
      res.status(500).json({ error: 'Failed to fetch hostel' });
    }
  }
export const getAllUser=  async (req, res) => {
    try {
      const userList = await UserModel.find().sort({_id:-1}); 
      res.status(201).json(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
export const changeHostelStatus=  async (req, res) => {
    try {
      const {stat,id} = req.body;
      if(!stat)
        return res.status(201).json({err:true, message:"status validation failed"});
      if(!id)
        return res.status(201).json({err:true, message:"id validation failed"});
      const hostel= await HostelModel.findByIdAndUpdate(id,{$set:{isApproved:stat}})
      console.log(hostel,'status2');
      res.status(201).json({err:false, hostel});
    } catch (error) {
      console.error('Error creating hostel:', error);
      res.status(500).json({ err:true, error: 'Failed to fetch hostel' });
    }
}
export const changeHostelListing=  async (req, res) => {
    try {
      const {listing,id} = req.body;
      console.log(req.body,'hostel listing controller');
      if(!listing)
        return res.status(201).json({err:true, message:"status validation failed"});
      if(!id)
        return res.status(201).json({err:true, message:"id validation failed"});
      const hostel= await HostelModel.findByIdAndUpdate(id,{$set:{isBlocked:listing}})
      console.log(hostel,'status2');
      res.status(201).json({err:false, hostel});
    } catch (error) {
      console.error('Error creating hostel:', error);
      res.status(500).json({ err:true, error: 'Failed to fetch hostel' });
    }
}

export const changeUserStatus=  async (req, res) => {
    try {
      const {stat,id} = req.body;
      if(!stat)
        return res.status(201).json({err:true, message:"status validation failed"});
      if(!id)
        return res.status(201).json({err:true, message:"id validation failed"});
      const user= await UserModel.findByIdAndUpdate(id,{$set:{isBlocked:stat}})
      console.log(user,'status2');
      res.status(201).json({err:false, user});
    } catch (error) {
      console.error('Error creating hostel:', error);
      res.status(500).json({ err:true, error: 'Failed to fetch user' });
    }
}