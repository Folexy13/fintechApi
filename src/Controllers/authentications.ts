//Imports
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const Flutterwave = require('flutterwave-node-v3');

//Import Db and configs
import config from '../Configs/configTypes';
import DB from './db';

//Destructured functions
import { FnResponseDataType, RegisterDataType,TokenDataType,typeEnum,ChangePasswordDataType,VerifyOtpDataType, AuthPayloadDataType} from "../Helpers/types";
import { handleResponse,errorResponse, successResponse,otpValidity } from "../Helpers/utility";
import {  login, sendOtp,activateAccount } from '../Helpers/auth';

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation Error', errors.array());
    }
    const { firstName,lastName,phone, email, gender,password,walletbalance} = req.body;
    //Hash user Password
    
        const salt: string = await bcrypt.genSalt(15);
        const hashedPwd:string = await bcrypt.hash(password,salt)
        
    let insertData: RegisterDataType = { firstName,lastName, phone, email,walletbalance,gender, password: hashedPwd };

    try {
        const isExist: any = await DB.users.findOne({ where: { email }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

        if (isExist) return handleResponse(res, 400,false, `User with email ${email} already exists`);
        const user: any = await DB.users.create(insertData);
        if (user) {
			
            await DB.userSettings.create({ userId: user.id });
		
			let payload: AuthPayloadDataType = {
				id: user.id,
				names:`${user.firstName} ${user.lastName}`,
				phone:user.phone,
				gender:user.gender,
				email: user.email,
				type:'registration',
				status:'inactive'
			};
			const token: string = jwt.sign(payload, config.JWTSECRET);
			const data: TokenDataType = { type: 'token', token, user: payload };
			await sendOtp({ email,type: typeEnum.VERIFICATION });
			return handleResponse(res, 200, true, `Registration successfull`);
		} else {
			return handleResponse(res, 401, false, `An error occured`);
		}
    } catch (error) {
        return handleResponse(res, 401, false, `An error occured - ${error}`);
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return errorResponse(res, 'Validation Error', errors.array());
	}
	try {
		// var currentdate = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))))
		var currentdate = new Date()
		const { token, otp, email, type }: VerifyOtpDataType = req.body;
		const decoded: any = jwt.verify(token, config.JWTSECRET);

		if (!decoded) return errorResponse(res, `Invalid verification`);
		if (decoded.email != email) return errorResponse(res, `OTP was not sent to this particular email`);
		const otpInstance = await DB.otp.findOne({ where: { userId: decoded.id} });
		if (!otpInstance) return errorResponse(res, `OTP does not exists`);
		if (otpInstance.verified) return errorResponse(res, `OTP Already Used`);
		if (!otpValidity(otpInstance.expirationTime, currentdate)) return errorResponse(res, 'OTP Expired');
		if (otp != otpInstance.otp) return errorResponse(res, 'OTP NOT Matched');

		const updateData = { verified: true, verifiedAt: currentdate };
		await otpInstance.update(updateData);

		if (type === typeEnum.TWOFA) {
			const loginResponse: FnResponseDataType = await login({ email, password: decoded.password });
			if (!loginResponse.status) return errorResponse(res, loginResponse.message);
			return successResponse(res, 'Login Successful', loginResponse.data);
		} else if (type === typeEnum.RESET) {
			if (decoded.password) return errorResponse(res, 'Suspicious attempt discovered! Pls reset password again');
			return successResponse(res, 'OTP Matched', token);
		} else {
			const accountActivated = await activateAccount(email);
			if (!accountActivated.status) return errorResponse(res, accountActivated.message);
			return successResponse(res, 'Email verified', email);
		}
	} catch (error) {
		console.log(error);
		return errorResponse(res, `An error occured - ${error}`);
	}
};

export const preLogin = async(req:Request, res:Response) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return errorResponse(res, 'Validation Error', errors.array());
	}

	const { email, password } = req.body;

    try{
        const user = await DB.users.findOne({
			where: { email },
			attributes: { exclude: ['createdAt', 'updatedAt'] },include: { model: DB.userSettings, attributes: { exclude: ['createdAt', 'updatedAt'] } },
		});
        if(user){
            if(user.userSetting.twoFa){
                const sendOtpResponse : FnResponseDataType = await sendOtp({email,password,type:typeEnum.TWOFA});
                if(!sendOtpResponse.status) return errorResponse(res,sendOtpResponse.message);
                const data: TokenDataType = {type:'2fa', token:sendOtpResponse.data};
                return successResponse(res, sendOtpResponse.message,data)
            }else{
                const loginResponse: FnResponseDataType = await login({email,password});
                if(!loginResponse.status) return errorResponse(res,loginResponse.message);
                return successResponse(res,loginResponse.message, loginResponse.data);
            }
        }else{
            return handleResponse(res,401, false, 'Incorrect Email,Cross-Check  email')
        }
    }catch(err){
        console.log(err);
        return handleResponse(res,401,false, `An error occured - ${err} `);
    }
};

export const updatePassword = async(req:Request,res:Response) =>{
const errors = validationResult(req)

if(!errors.isEmpty()){
    return errorResponse(res, 'Validation Error', errors.array());
}

const {email,oldPassword,newPassword} = req.body;

try {
    const user = await DB.users.findOne({where:{email},  attributes: {excludes:['createdAt', 'updatedAt'] }})
    if(!user) return errorResponse(res,`user with ${email} not found`);
    const validPassword: boolean = await bcrypt.compareSync(oldPassword,user.password);
    if(!validPassword) return errorResponse(res, 'Old password does not match!');
    const salt: string = await bcrypt.genSalt(15);
    const hashPassword: string = await bcrypt.hash(newPassword,salt);
    const updatedPassword: any = user.update({password:hashPassword});
    if(!updatedPassword) return errorResponse(res,'Unable to update Password!');
    return successResponse(res,`Password update was successful`);
} catch (error) {
    console.log(error);
    return errorResponse(res,`An error occured ${error}`)
}
};

export const resetPassword = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return errorResponse(res, 'Validation Error', errors.array());
	}

	const { email } = req.body;

	try {
		const user = await DB.users.findOne({
			where: { email },
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});

		if (user) {
			const sendOtpResponse: FnResponseDataType = await sendOtp({ email, type: typeEnum.RESET });
			if (!sendOtpResponse.status) return errorResponse(res, sendOtpResponse.message);
			return successResponse(res, sendOtpResponse.message, sendOtpResponse.data);
		} else {
			return handleResponse(res, 401, false, `Incorrect Email`);
		}
	} catch (error) {
		console.log(error);
		return handleResponse(res, 401, false, `An error occured - ${error}`);
	}
};

export const changePassword = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return errorResponse(res, 'Validation Error', errors.array());
	}
	const { token, password }: ChangePasswordDataType = req.body;

	try {
		const decoded: any = jwt.verify(token, config.JWTSECRET);
		if (!decoded) return errorResponse(res, `Invalid verification`);

		const user = await DB.users.findOne({ where: { email: decoded.email, status: 'active' }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
		if (!user) return errorResponse(res, `Account Suspended!, Please contact support!`);
		const salt: string = await bcrypt.genSalt(15);
		const hashPassword: string = await bcrypt.hash(password, salt);
		const updatedPassword: any = await user.update({ password: hashPassword });
		if (!updatedPassword) return errorResponse(res, `Unable update password!`);
		return successResponse(res, `Password changed successfully`);
	} catch (error) {
		console.log(error);
		return errorResponse(res, `An error occured - ${error}`);
	}
};

export const updateUserSettings = async (req:Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return errorResponse(res, 'Validation Error', errors.array());
	}
	const { twoFa } = req.body;
	const { id } = req.user;

	try {
		const user = await DB.users.findOne({ where: { id } });
		const updatedSettings: any = await user.update({ twoFa });
		if (!updatedSettings) return errorResponse(res, `Unable update settings!`);
		return successResponse(res, `Settings updated successfully`);
	} catch (error) {
		console.log(error);
		return errorResponse(res, `An error occured - ${error}`);
	}
};

export const chargeCard = async (req:Request, res:Response) => {
const flw = new Flutterwave(config.FlW_PUBLIC_KEY, config.FlW_SECRET_KEY);

	let payload = {
        "card_number": "5531886652142950",
        "cvv": "564",
        "expiry_month": "09",
        "expiry_year": "23",
        "currency": "NGN",
        "amount": "100",
        "redirect_url": "http://localhost:8081/callback",
        "fullname": "Aluko Opeyemi",
        "email": "folajimiopeyemisax13@gmail.com",
        "phone_number": "07067903042",
        "enckey": config.FLW_ENCRYPTION_KEY,
        "tx_ref": "MC-344ee--4eerye4euee3rerhfghfh23e43e" ,// This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
		"authorization": {
			"mode": "pin",
			"fields": [
				"pin"
			],
			"pin": 3310
		}
    }
	try {
		const response = await flw.Charge.card(payload)
		console.log(response)
		if (response.meta.authorization.mode === 'pin') {
			let payload2 = payload
			payload2.authorization = {
				"mode": "pin",
				"fields": [
					"pin"
				],
				"pin": 3310
			}
			const reCallCharge = await flw.Charge.card(payload2)

			const callValidate = await flw.Charge.validate({
				"otp": "12345",
				"flw_ref": reCallCharge.data.flw_ref
			})
			console.log(callValidate)

		}
		if (response.meta.authorization.mode === 'redirect') {
			console.log("Here 1")
			var url = response.meta.authorization.redirect
			res.redirect(url)
		}


	} catch(error) {
		return error
	}
}
