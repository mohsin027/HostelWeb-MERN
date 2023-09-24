import express from 'express';

import { userRegisterVerify, checkUserLoggedIn, home, logoutUser, userLogin, userReg, resendEmail } from '../controllers/userAuthController.js';

const router=express.Router();

router.get('/',home)
router.post('/register',userReg)
router.post('/register/verify',userRegisterVerify)
router.post('/register/resendEmail',resendEmail)
router.post('/login',userLogin)
router.get('/login/check',checkUserLoggedIn)
router.get('/logout',logoutUser)

export default router 