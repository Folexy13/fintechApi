"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var express_1 = require("express");
var validate_1 = __importDefault(require("./validate"));
var authentications_1 = require("./Controllers/authentications");
var router = (0, express_1.Router)();
// *******  API CALLS  ********
//Index to show our api is working
router.get('/', function (req, res) { return res.json({ message: 'Api is working' }); });
//Endpoints
//A dummy callback for the  payment gateway
router.get('/callback', function (req, res) {
    res.json({
        status: "Successful",
        message: "Payment successful",
        Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZXMiOiJBbHVrbyIsInBob25lIjoiMDcwNjc5MDMwNDIiLCJnZW5kZXIiOiJNQUxFIiwiZW1haWwiOiJmb2xhamltaW9wZXllbWlzYXgxM0BHTUFJTC5DT00iLCJ0eXBlIjoicmVnaXN0cmF0aW9uIiwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNjUxMjY5NjgyfQ.mvC_78zujrlmjf6hIOL5YcSBbBUCUlX0yqJUnFBNw_g'
    });
});
router.post('/register', (0, validate_1.default)('/register'), authentications_1.register);
router.post('/login', (0, validate_1.default)('/login'), authentications_1.preLogin);
router.post('/update-password', (0, validate_1.default)('/update-password'), authentications_1.updatePassword);
router.post('/reset-password', (0, validate_1.default)('/reset-password'), authentications_1.resetPassword);
router.post('/change-password', (0, validate_1.default)('/change-password'), authentications_1.changePassword);
router.post('/verify-otp', (0, validate_1.default)('/verify-otp'), authentications_1.verifyOtp);
router.post('/update-user-settings', (0, validate_1.default)('/update-user-settings'), authentications_1.updateUserSettings);
router.post('/pay', authentications_1.chargeCard);
exports.default = router;
