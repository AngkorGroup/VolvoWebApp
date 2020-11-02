import { Contact } from 'common/utils';

//export interface ClientUser {
//	id: string;
//	documentType: string;
//	documentNumber: string;
//	type: string;
//	phone: string;
//	email: string;
//	name: string;
//}

export type ClientUser = Partial<Contact>;

export const mapContacts = (contacts: Contact[]) => {
	return contacts.map((c) => ({
		id: c.id,
		documentType: c.documentType,
		documentNumber: c.documentNumber,
		type: c.type,
		phone: c.phone,
		email: c.email,
		firstName: c.firstName,
		lastName: c.lastName,
	}));
};
