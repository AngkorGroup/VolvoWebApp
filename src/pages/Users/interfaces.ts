import { Card, UserAdmin } from 'common/utils';

export interface User {
	id: string;
	innerId: string;
	firstName: string;
	lastName: string;
	clientId: string;
	email: string;
	phone: string;
	createdAt: string;
	type: string;
	status: string;
	password?: string;
	archiveAt: string;
	dealerId: string;
}

export type UserForm = Partial<User>;

export interface UserCard {
	number: string;
	createdAt: string;
	type: string;
	currency: string;
	balance: number;
}

export const mapUserCards = (cards: Card[]): UserCard[] => {
	return cards.map((c) => ({
		number: c.code,
		createdAt: c.createdAt,
		type: c.cardType.name,
		currency: c.balance.currency,
		balance: c.balance.value,
	}));
};

export const mapUserAdmin = ({
	id,
	admin,
	contact,
	cashier,
	type,
	createdAt,
}: UserAdmin): User => {
	let user = null;
	let clientId = '';
	let dealerId = '';
	console.log({ contact, cashier, admin });
	if (contact) {
		user = contact;
		clientId = `${contact.clientId}`;
	} else if (!!cashier) {
		user = cashier;
	} else {
		user = admin;
		dealerId = `${admin?.dealerId}`;
	}
	console.log({ user });

	const {
		id: innerId,
		firstName,
		lastName,
		email,
		phone,
		status,
		archiveAt,
	} = user;

	return {
		id: `${id}`,
		innerId: `${innerId}`,
		clientId,
		firstName,
		lastName,
		email,
		phone,
		createdAt,
		type,
		status,
		archiveAt,
		dealerId,
	};
};

export const mapUserAdmins = (users: UserAdmin[]): User[] => {
	return users.map(mapUserAdmin);
};
