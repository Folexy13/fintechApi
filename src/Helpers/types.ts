export interface RegisterDataType {
	firstName: string;
	lastName: string;
	phone: string;
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