import {
	CONTACT_URL,
	GET_CONTACTS_BY_FILTER_URL,
	GET_CONTACTS_BY_CLIENTS_URL,
} from 'common/constants/api';
import { api, Contact } from 'common/utils';

export const getContactsByClient = async (clientId: string) => {
	return await api.get<Contact[]>(
		`${GET_CONTACTS_BY_CLIENTS_URL}?clientId=${clientId}`,
	);
};

export const getContactsByFilter = async (query?: string) => {
	return await api.get<Contact[]>(GET_CONTACTS_BY_FILTER_URL, { query });
};

export const editContact = async (contact: Partial<Contact>) => {
	return await api.put<Contact>(`${CONTACT_URL}/${contact.id}`, contact);
};

export const makeContactPrimary = async (id: string) => {
	return await api.post(`${CONTACT_URL}/${id}/make_primary`);
};
