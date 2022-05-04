export interface RegisterDataType {
	firstName: string;
	lastName: string;
	phone: string;
	gender:string;
	email: string;
	password: string;
	walletbalance: number;
	role?: string;
}

export interface FnResponseDataType {
	status: boolean;
	message: string;
	data?: any;
}

export interface AuthPayloadDataType {
	id: number;
	names: string;
	phone: string;
	gender:string;
	email: string;
	status: string;
	role?: string;
	type: string;
}

export interface TokenDataType {
	type: 'token' | '2fa';
	token: string;
	user?: AuthPayloadDataType;
	admin?: AuthPayloadDataType;
}

export interface SendMailDataType {
	senderName: string;
	senderEmail: string;
	mailRecipients: string[] | string;
	mailSubject: string;
	mailBody: string;
	mailAttachments?: string;
}

export interface PrepareMailDataType {
	mailRecipients: string[] | string;
	mailSubject: string;
	mailBody: string;
	senderName: string;
	senderEmail: string;
}

export interface ContactUsTemplateDataType {
	name: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
}

export interface SubscribeTemplateDataType {
	firstName: string;
	email: string;
}

export interface OtpDetailsDataType {
	timestamp: Date;
	email: string;
	password?: string;
	success: boolean;
	message: string;
	otpId: number;
}
export enum typeEnum {
	VERIFICATION = 'verification',
	RESET = 'reset',
	TWOFA = '2fa',
}

export interface SendOtpDataType {
	email: string;
	type: typeEnum;
	password?: string;
}

export interface OtpMailTemplateDataType {
	subject: string;
	body: string;
}

export interface GetOtpTemplateDataType {
	otp: number;
	type: typeEnum;
}

export interface VerifyOtpDataType {
	token: string;
	otp: number;
	email: string;
	type: typeEnum;
}

export interface LoginDataType {
	email: string;
	password: string;
}


export interface ChangePasswordDataType {
	token: string;
	password: string;
}

export interface SendSmsDataType {
	phone: string[];
	text: string;
}

export interface PrepareSmsDataType {
	recipents: string;
}

export enum AdminRoles {
	CONTROL = 'control',
	SUPPORT = 'support',
}