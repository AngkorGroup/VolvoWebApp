export interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	type: string;
	status: string;
	deletedAt?: string;
}

export interface UserCard {
	number: string;
	createdAt: string;
	type: string;
	currency: string;
	balance: string;
}

export interface UserPOSForm {
	id: string;
	dealer: string;
	pos: string;
}
