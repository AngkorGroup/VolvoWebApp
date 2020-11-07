import { Contact } from 'common/utils';

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
	status: contact.status,
});

export const mapContacts = (contacts: Contact[]) => {
	return contacts.map(mapContact);
};
