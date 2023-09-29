import cloudinary from "../config/cloudinary.js";
import HostelModel from "../models/hostelModel.js";
import RoomModel from "../models/roomModel.js";



export const addRooms=  async (req, res) => {
    try {
      console.log(req.body)
      const room_image=await cloudinary.uploader.upload(req.body.room_image,{
        folder:'hostelweb'
      })
      const {room_no,room_rent,capacity,title,description,hostelId} = req.body
      const newRoom = new RoomModel({room_no,room_rent,capacity,title,description, room_image, hostelId});
      await newRoom.save();
      const updateHostel=await HostelModel.findByIdAndUpdate(hostelId,{$push:{rooms:newRoom._id}});
      console.log(updateHostel,"room added to hostel");
      res.status(201).json({success:true,});
      console.log(newRoom,'new hostel in controller');
    } catch (error) {
      console.error('Error creating room:', error);
      res.status(500).json({ error: 'Failed to add room' });
    }
  }
  