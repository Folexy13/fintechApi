//Imports
import { Router } from 'express'
import validate from './validate';
import { preLogin, register, updatePassword,resetPassword,changePassword,updateUserSettings,verifyOtp,chargeCard} from './Controllers/authentications';


const router = Router();


// *******  API CALLS  ********
//Index to show our api is working
router.get('/', (req, res) => res.json({ message: 'Api is working' }));

//Endpoints

//A dummy callback for the  payment gateway

router.get('/callback',(req,res)=>{
    res.json({
        status:"Successful",
        message:"Payment successful",
        Token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZXMiOiJBbHVrbyIsInBob25lIjoiMDcwNjc5MDMwNDIiLCJnZW5kZXIiOiJNQUxFIiwiZW1haWwiOiJmb2xhamltaW9wZXllbWlzYXgxM0BHTUFJTC5DT00iLCJ0eXBlIjoicmVnaXN0cmF0aW9uIiwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNjUxMjY5NjgyfQ.mvC_78zujrlmjf6hIOL5YcSBbBUCUlX0yqJUnFBNw_g'
    })
})
router.post('/register', validate('/register'),register);
router.post('/login',validate('/login'), preLogin);
router.post('/update-password',validate('/update-password'),updatePassword)
router.post('/reset-password', validate('/reset-password'), resetPassword);
router.post('/change-password', validate('/change-password'), changePassword);
router.post('/verify-otp', validate('/verify-otp'), verifyOtp);
router.post('/update-user-settings', validate('/update-user-settings'), updateUserSettings);
router.post('/pay',chargeCard)


export default router;