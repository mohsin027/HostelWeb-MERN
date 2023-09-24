import express from 'express';
import { bookRoom, editUserProfile, editUserProfileImage, getBookings, getHostel, getRoomsByHostel } from '../controllers/userController.js';
import { paymentOrder, verifyPayment } from '../controllers/paymentController.js';
const router=express.Router();

// router.post('/addHostel',addHostel)
router.get('/hostel',getHostel)
router.get('/bookings/:id',getBookings)
router.post('/bookRoom',bookRoom)
router.get('/rooms/:hostelId',getRoomsByHostel)
router.patch('/editUserProfile',editUserProfile)
router.patch('/editUserProfileImage',editUserProfileImage)
router.post("/payment", paymentOrder)
router.post("/payment/verify", verifyPayment)







export default router