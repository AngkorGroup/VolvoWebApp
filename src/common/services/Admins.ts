import { USERS_URL, USER_ADMIN_URL } from 'common/constants/api';
import { api, UserAdmin, Admin, Card } from 'common/utils';

export const getUsers = async (key: string, onlyActive?: boolean) => {
	return await api.get<UserAdmin[]>(USERS_URL, { onlyActive });
};

export const addUser = async (user: Partial<Admin>) => {
	return await api.post<Admin>(USER_ADMIN_URL, user);
};

export const editUser = async (user: Partial<Admin>) => {
	return await api.put<Admin>(USER_ADMIN_URL, user);
};

export const resetUser = async (id: string) => {
	return await api.post(`${USERS_URL}/${id}/reset_password`);
};

export const deleteUser = async (id: string, contactId?: string) => {
	return await api.delete(`${USERS_URL}/${id}`, { contactId });
};

export const getUserCards = async (id: string) => {
	return await api.get<Card[]>(`${USERS_URL}/${id}/cards`);
};
