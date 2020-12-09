import { Contact } from 'common/utils';

export interface ContactColumn {
	id: string;
	documentTypeId: string;
	documentNumber: string;
	type: string;
	phone: string;
	email: string;
	fullName: string;
	firstName: string;
	lastName: string;
	status: string;
	archiveAt: string;
}

export const mapContacts = (contacts: Contact[]): ContactColumn[] => {
	return contacts.map((contact: Contact) => ({
		id: `${contact.id}`,
		documentTypeId: `${contact.documentTypeId}`,
		documentNumber: contact.documentNumber,
		type: contact.type,
		phone: contact.phone,
		email: contact.email,
		fullName: contact.fullName,
		firstName: contact.firstName,
		lastName: contact.lastName,
		status: contact.status,
		archiveAt: contact.archiveAt,
	}));
};
