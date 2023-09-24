import express from 'express';
import {  addHostel, changeHostelListing, getBookings, getRoomsByHostel, handleBlockStatus, hostelCheck, updateHostel } from '../controllers/hostelController.js';
import { addRooms } from '../controllers/roomController.js';
const router=express.Router();

router.post('/addHostel',addHostel)
router.post('/check',hostelCheck)
router.get('/booking',getBookings)
router.post('/addRooms',addRooms)
router.post('/blockStatus',handleBlockStatus)
router.get('/rooms/:hostelId',getRoomsByHostel)
router.patch('/updateHostel',updateHostel)
router.patch('/listingStatus',changeHostelListing )








export default router