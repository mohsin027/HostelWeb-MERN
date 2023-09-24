import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import HostelModel from "../models/hostelModel.js";
import roomBookingModel from "../models/roomBookingModel.js";
import RoomModel from "../models/roomModel.js";

export const addHostel=  async (req, res) => {
  try {
    console.log(req.body)
    const hostelImage=await cloudinary.uploader.upload(req.body.hostelImage,{
      folder:'hostelweb'
    }) 
    const newHostel = new HostelModel({...req.body, hostelImage});
    await newHostel.save();
    res.status(201).json({success:true,});
    console.log(newHostel,'new hostel in controller');
  } catch (error) {
    console.error('Error creating hostel:', error);
    res.status(500).json({ error: 'Failed to create hostel' });
  }
}
export const hostelCheck=  async (req, res) => {
  try {
    // console.log(req.body,'ho con cvons');
    const isHostel =await HostelModel.find({adminData: req.body.adminData}).populate('rooms')
    res.status(201).json({success:true,isHostel});
    // console.log(isHostel,' hostel check controller');
  } catch (error) {
    console.error('Error checking hostel:', error);
    res.status(500).json({ error: 'Failed to check hostel' });
  }
}
export const getBookings=  async (req, res) => {
  try {
    // console.log(req.body,'ho con cvons');
    const roomBooking =await roomBookingModel.find({}).populate('hostelId roomId userId');
    res.status(201).json({success:true,roomBooking});
    // console.log(roomBooking,' booking check controller');
  } catch (error) {
    console.error('Error checking bookings:', error);
    res.status(500).json({ error: 'Failed to check bookings' });
  }
}
export const getRoomsByHostel=  async (req, res) => {
  try {
    const {hostelId}=req.params;
    // console.log(hostelId,'ho con getRooms');
    const hostel =await HostelModel.findById(hostelId).populate('rooms');
    res.status(201).json({success:true,rooms:hostel.rooms});
    // console.log(hostel,' room by hostel controller');
  } catch (error) {
    console.error('Error get rooms:', error);
    res.status(500).json({ error: 'Failed to get  rooms' });
  }
}

export const handleBlockStatus=  async (req, res) => {
  try {
    const {id,stat}=req.body;
    // console.log(req.body);
    const blockStatus =await RoomModel.findByIdAndUpdate(id,{block:stat})
    res.status(201).json({success:true});
    console.log(blockStatus,' room status controller');
  } catch (error) {
    console.error('Error status rooms:', error);
    res.status(500).json({ error: 'Failed to get  status' });
  }
}

export const updateHostel=  async (req, res) => {
  try {
    const {_id, hostelName, location,  description,admissionFees} = req.body
    const hostelImage=await cloudinary.uploader.upload(req.body.hostelImage,{
      folder:'hostelweb'
    })
    console.log(req.body,'update hostel in controller')

    const updatedHostel = await HostelModel.findByIdAndUpdate(_id, {
      $set:{
        hostelName, location,  description,admissionFees,hostelImage,
      }
    })
    // const test= await HostelModel.find({_id})
    // console.log('test',test)
    res.status(201).json({success:true,updatedHostel, err:false});
    console.log(updatedHostel,'hostel updated successfully')
  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ err:true, error: 'Failed to update hostel' });
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
