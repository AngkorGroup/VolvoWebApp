import { ROLES_URL } from 'common/constants';
import { api, Role } from 'common/utils';

export const getRoles = async (onlyActive?: boolean) => {
	return await api.get<Role[]>(ROLES_URL, { onlyActive });
};

export const getQueryRoles = async (key: string, onlyActive?: boolean) => {
	return getRoles(onlyActive);
};

export const addRole = async (role: any) => {
	return await api.post<Role>(ROLES_URL, role);
};

export const editRole = async (role: any) => {
	return await api.put<Role>(ROLES_URL, role);
};

export const deleteRole = async (id: string) => {
	return await api.delete(`${ROLES_URL}/${id}`);
};
