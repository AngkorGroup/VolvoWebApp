import { Card, Option, RoleAdmin, UserAdmin } from 'common/utils';

export interface User {
	id: string;
	innerId: string;
	fullName: string;
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
	cashierId: string;
	roleIds?: any[];
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
		currency: c.balance.currency?.symbol,
		balance: c.balance.value,
	}));
};

export const mapRoleAdmins = (roles: RoleAdmin[]): Option[] => {
	return roles?.map((r) => ({
		value: `${r.role?.id}`,
		label: r.role?.name,
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
	let cashierId = '';
	let roleIds = undefined;
	if (contact) {
		user = contact;
		clientId = `${contact.clientId}`;
	} else if (!!cashier) {
		user = cashier;
	} else {
		user = admin;
		dealerId = `${admin?.dealerId}`;
		cashierId = `${admin?.cashierId}`;
		roleIds = mapRoleAdmins(admin.roleAdmins);
	}

	const {
		id: innerId,
		fullName,
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
		fullName,
		firstName,
		lastName,
		email,
		phone,
		createdAt,
		type,
		status,
		archiveAt,
		dealerId,
		cashierId,
		roleIds,
	};
};

export const mapUserAdmins = (users: UserAdmin[]): User[] => {
	return users.map(mapUserAdmin);
};
