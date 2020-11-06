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

export const mapContact = (contact: Contact) => ({
	id: contact.id,
	documentType: contact.documentType,
	documentNumber: contact.documentNumber,
	type: contact.type,
	phone: contact.phone,
	email: contact.email,
	firstName: contact.firstName,
	lastName: contact.lastName,
});

export const mapContacts = (contacts: Contact[]) => {
	return contacts.map(mapContact);
};
