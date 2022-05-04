// Import types
import { GetOtpTemplateDataType, typeEnum } from '../types';

export const getOtpTemplateData = ({ otp, type }: GetOtpTemplateDataType) => {
	if (type === typeEnum.VERIFICATION) {
		return {
			mailSubject: 'Email Verification',
			mailBody: `
				<p>OTP for your email verification is :</p>
				<p>${otp}</p>
				<p>This Otp is valid for only 10 minutes</p>
			`
		};
	} else if (type === typeEnum.RESET) {
		return {
			mailSubject: 'Password Reset',
			mailBody: `
				<p>OTP for your password reset request is :</p>
				<p>${otp}</p>
				<p>This Otp is valid for only 10 minutes</p>
			`,
		};
	} else {
		return {
			mailSubject: 'Two Factor Authentication',
			mailBody: `
				<p>OTP for your 2FA is :</p>
				<p>${otp}</p>
				<p>This Otp is valid for only 10 minutes</p>
			`,
		};
	}
};

