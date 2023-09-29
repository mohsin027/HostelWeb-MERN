import HostelModel from "../models/hostelModel.js";
import roomBookingModel from "../models/roomBookingModel.js";
import UserModel from "../models/userModel.js";
import cron from "node-cron";


cron.schedule('0 0 0 * * * *', async() => {
  try{
    const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  console.log(today, tomorrow)
  const updated = await roomBookingModel.updateMany({
    expiry: {
      $gte: today,
      $lt: tomorrow,
    },
    status:'active'
  },{
    $set:{
      status:"expired"
    }
  })
  console.log(updated.modifiedCount + " expired")
  }catch(err){
    console.log(err)
  }
});


export const getAllHostel = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    console.log(limit, skip);
    const count = await HostelModel.find().count();
    let hostelList = [];
    if (limit) {
      hostelList = await HostelModel.find()
        .skip(skip ?? 0)
        .limit(limit)
        .sort({ _id: -1 });
    } else {
      hostelList = await HostelModel.find()
        .skip(skip ?? 0)
        .sort({ _id: -1 });
    }
    res.status(201).json({ hostelList, count, limit, skip });
  } catch (error) {
    console.error("Error getting hostel:", error);
    res.status(500).json({ error: "Failed to fetch hostel" });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const count = await UserModel.find().count();
    let userList = [];
    if (limit) {
      userList = await UserModel.find()
        .skip(skip ?? 0)
        .limit(limit)
        .sort({ _id: -1 });
    } else {
      userList = await UserModel.find()
        .skip(skip ?? 0)
        .sort({ _id: -1 });
    }
    res.status(201).json({userList, count, skip, limit});
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
export const changeHostelStatus = async (req, res) => {
  try {
    const { stat, id } = req.body;
    if (!stat)
      return res
        .status(201)
        .json({ err: true, message: "status validation failed" });
    if (!id)
      return res
        .status(201)
        .json({ err: true, message: "id validation failed" });
    const hostel = await HostelModel.findByIdAndUpdate(id, {
      $set: { isApproved: stat },
    });
    console.log(hostel, "status2");
    res.status(201).json({ err: false, hostel });
  } catch (error) {
    console.error("Error creating hostel:", error);
    res.status(500).json({ err: true, error: "Failed to fetch hostel" });
  }
};
export const changeHostelListing = async (req, res) => {
  try {
    const { listing, id } = req.body;
    console.log(req.body, "hostel listing controller");
    if (!listing)
      return res
        .status(201)
        .json({ err: true, message: "status validation failed" });
    if (!id)
      return res
        .status(201)
        .json({ err: true, message: "id validation failed" });
    const hostel = await HostelModel.findByIdAndUpdate(id, {
      $set: { isBlocked: listing },
    });
    console.log(hostel, "status2");
    res.status(201).json({ err: false, hostel });
  } catch (error) {
    console.error("Error creating hostel:", error);
    res.status(500).json({ err: true, error: "Failed to fetch hostel" });
  }
};

export const changeUserStatus = async (req, res) => {
  try {
    const { stat, id } = req.body;
    if (!stat)
      return res
        .status(201)
        .json({ err: true, message: "status validation failed" });
    if (!id)
      return res
        .status(201)
        .json({ err: true, message: "id validation failed" });
    const user = await UserModel.findByIdAndUpdate(id, {
      $set: { isBlocked: stat },
    });
    console.log(user, "status2");
    res.status(201).json({ err: false, user });
  } catch (error) {
    console.error("Error creating hostel:", error);
    res.status(500).json({ err: true, error: "Failed to fetch user" });
  }
};


export const dashboardData= async (req,res)=>{
 try {
  const hostelCount = await HostelModel.find().count()
  const userCount = await UserModel.find().count()
  const bookings = await roomBookingModel.find()
  const today = new Date();

// for (const booking of bookings) {
//   const checkInDate = booking.checkIn;
//   const checkOutDate = new Date(checkInDate);
//   checkOutDate.setDate(checkOutDate.getDate() + 30);

//   if (today >= checkInDate && today <= checkOutDate) {
//     console.log(`Booking ${booking._id} is active.`);
//   } else {
//     console.log(`Booking ${booking._id} is not active.`);
//   }
// }
const activeBookings = bookings.filter((booking) => {
  const checkInDate = booking.checkIn;
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + 30);

  return today >= checkInDate && today <= checkOutDate;
});
const activeBookingsCount = activeBookings.length;

//  const activeBooking= booking.filter((item)=>item.checkIn)
  const bookingCount = bookings.length
  console.log("bookingCount",activeBookings);
  res.status(201).json({ err: false, message:'success',hostelCount,userCount,bookingCount,activeBookingsCount });
 } catch (error) {
  console.log(error);
  res.status(500).json({ err: true, error: "Failed to fetch data" });
 }
}