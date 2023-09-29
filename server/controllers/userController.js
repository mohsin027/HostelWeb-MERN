import mongoose from "mongoose";
import HostelModel from "../models/hostelModel.js";
import UserModel from "../models/userModel.js";
import roomBookingModel from "../models/roomBookingModel.js";
import RoomModel from "../models/roomModel.js";
import Razorpay from 'razorpay'
import cloudinary from "../config/cloudinary.js";


let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// export const getHostel=  async (req, res) => {
//   try {
    
//     const hostels = await HostelModel.find({isApproved: "Approved",isBlocked:false}).populate("rooms");
//     res.status(201).json({success:true,hostels});
//     console.log(hostels,'userside hostel listing')
//   } catch (error) {
//     console.error('Error getting hostel:', error);
//     res.status(500).json({ error: 'Failed to get hostel' });
//   }
// }
export const getHostel = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    console.log(limit, skip);
    const count = await HostelModel.find({isApproved: "Approved",isBlocked:false}).count();
    let hostelList = [];
    if (limit) {
      hostelList = await HostelModel.find({isApproved: "Approved",isBlocked:false}).populate("rooms")
        .skip(skip ?? 0)
        .limit(limit)
        .sort({ _id: -1 });
    } else {
      hostelList = await HostelModel.find({isApproved: "Approved",isBlocked:false}).populate("rooms")
        .skip(skip ?? 0)
        .sort({ _id: -1 });
    }
    res.status(201).json({ hostelList, count, limit, skip });
  } catch (error) {
    console.error("Error getting hostel:", error);
    res.status(500).json({ error: "Failed to fetch hostel" });
  }
};

export const bookRoom=  async (req, res) => {
  try {
    console.log(req.body)
    // const booking = await roomBookingModel({});
    res.status(201).json({success:true});
    console.log('userside room booking')
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ error: 'Failed to book room' });
  }
}
export const editUserProfile=  async (req, res) => {
  try {
    const {id, fullName, address,  contactNumber} = req.body
    console.log(id)
    const editUser = await UserModel.findByIdAndUpdate(id, {
      $set:{
        fullName, address,  contactNumber
      }
    })
    res.status(201).json({success:true,editUser, err:false});
    console.log('profile updated successfully')
  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ err:true, error: 'Failed to update profile' });
  }
}
export const editUserProfileImage=  async (req, res) => {
  try {
    const {id} = req.body
    const image=await cloudinary.uploader.upload(req.body.image,{
      folder:'hostelweb'
    })
    console.log('image',req.body)
    const editUser = await UserModel.findByIdAndUpdate(id, {
      $set:{
        image:image
      }
    })
    res.status(201).json({success:true,editUser, err:false});
    console.log('profile updated successfully')
  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ err:true, error: 'Failed to update profile' });
  }
}
export const getRoomsByHostel=  async (req, res) => {
  try {
    const {hostelId} = req.params;
    const hostel = await HostelModel.findOne({_id:hostelId}).populate('rooms').lean()
    console.log('response in controler hosteldetails',hostel)
    res.status(201).json({success:true,hostel,err:false});
    console.log('profile updated successfully')
  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ err:true, error: 'Failed to update profile' });
  }
}
export const getBookings=  async (req, res) => {
  try {
    const {id} = req.params;
    const bookings = await roomBookingModel.find({userId:id}).populate('roomId hostelId')
    console.log('response in booking hosteldetails',bookings)
    res.status(201).json({success:true,bookings,err:false});
    console.log('profile booking fetch successfully')
  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ err:true, error: 'Failed to get profile' });
  }
}
export const cancelBooking=  async (req, res) => {
  try {
    const {bookingId} = req.params;
    console.log(bookingId);
    const booking = await roomBookingModel.findById(bookingId).populate('hostelId')
    if(booking.status==="cancelled"){
      return res.json({err:true, message:"Booking already cancelled"});
    }
    const paymentId=booking.paymentDetails.razorpay_payment_id;
    const payment = await instance.payments.fetch(paymentId);

    if (payment.amount_refunded) {
      return res.json({err:true, message:"Payment has been refunded."})
    }

    await instance.payments.refund(paymentId,{
      "amount": booking.amount * 100 ,
      "speed": "normal",
      "notes": {
        "notes_key_1": "Thank you for using hostelWeb",
      }
    })

    booking.status="cancelled";
    await booking.save();
    await RoomModel.findByIdAndUpdate(booking.roomId,{$inc:{occupants:-1}})

    console.log('profile booking cancel successfully')
    res.status(201).json({success:true ,err:false});
  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ err:true, error: 'Failed to cancel booking' });
  }
}
