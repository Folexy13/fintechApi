"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOtpTemplateData = void 0;
// Import types
var types_1 = require("../types");
var getOtpTemplateData = function (_a) {
    var otp = _a.otp, type = _a.type;
    if (type === types_1.typeEnum.VERIFICATION) {
        return {
            mailSubject: 'Email Verification',
            mailBody: "\n\t\t\t\t<p>OTP for your email verification is :</p>\n\t\t\t\t<p>".concat(otp, "</p>\n\t\t\t\t<p>This Otp is valid for only 10 minutes</p>\n\t\t\t")
        };
    }
    else if (type === types_1.typeEnum.RESET) {
        return {
            mailSubject: 'Password Reset',
            mailBody: "\n\t\t\t\t<p>OTP for your password reset request is :</p>\n\t\t\t\t<p>".concat(otp, "</p>\n\t\t\t\t<p>This Otp is valid for only 10 minutes</p>\n\t\t\t"),
        };
    }
    else {
        return {
            mailSubject: 'Two Factor Authentication',
            mailBody: "\n\t\t\t\t<p>OTP for your 2FA is :</p>\n\t\t\t\t<p>".concat(otp, "</p>\n\t\t\t\t<p>This Otp is valid for only 10 minutes</p>\n\t\t\t"),
        };
    }
};
exports.getOtpTemplateData = getOtpTemplateData;
