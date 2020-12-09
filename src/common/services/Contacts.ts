import {
	CONTACT_URL,
	GET_CONTACTS_BY_FILTER_URL,
	GET_CONTACTS_BY_CLIENTS_URL,
} from 'common/constants/api';
import { api, Contact } from 'common/utils';
import { ClientUserForm } from 'common/validations';

export const getContactsByClient = async (
	clientId: string,
	onlyActive?: boolean,
) => {
	return await api.get<Contact[]>(GET_CONTACTS_BY_CLIENTS_URL, {
		clientId,
		onlyActive,
	});
};

export const getQueryContactsByClient = async (
	key: string,
	clientId: string,
	onlyActive?: boolean,
) => {
	return await getContactsByClient(clientId, onlyActive);
};

export const getContactsByFilter = async (query?: string) => {
	return await api.get<Contact[]>(GET_CONTACTS_BY_FILTER_URL, { query });
};

export const editContact = async (contact: ClientUserForm) => {
	return await api.put<Contact>(`${CONTACT_URL}/${contact.id}`, contact);
};

export const makeContactPrimary = async (id: string) => {
	return await api.post(`${CONTACT_URL}/${id}/make_primary`);
};
