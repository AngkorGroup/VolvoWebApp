import { CONTACT_URL, GET_CONTACTS_BY_CLIENTS_URL } from 'common/constants/api';
import { api, Contact } from 'common/utils';

export const getContactsByClient = async (clientId: string) => {
	return await api.get<Contact[]>(
		`${GET_CONTACTS_BY_CLIENTS_URL}?clientId=${clientId}`,
	);
};

export const editContact = async (contact: Partial<Contact>) => {
	return await api.put(`${CONTACT_URL}/${contact.id}`, contact);
};
