import express from 'express';
import { changeHostelListing, changeHostelStatus, changeUserStatus, getAllHostel, getAllUser } from '../controllers/adminController.js';
const router=express.Router();


router.get('/hostel',getAllHostel)
router.get('/users',getAllUser)
router.patch('/hostel/registerStatus',changeHostelStatus )
router.patch('/hostel/listingStatus',changeHostelListing )
router.patch('/user/activeStatus',changeUserStatus )






export default router