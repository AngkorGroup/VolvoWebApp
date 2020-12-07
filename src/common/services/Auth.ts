import {
	LOGIN_URL,
	LOGOUT_URL,
	FORGOT_PASSWORD_URL,
	CHANGE_PASSWORD_URL,
	MENUS_URL,
} from 'common/constants';
import { api, LoginResponse, Menu } from 'common/utils';
import { ChangePasswordForm } from 'common/validations';

export const login = async (email: string, password: string) => {
	return await api.post<LoginResponse>(LOGIN_URL, { email, password });
};

export const logout = async () => {
	return await api.delete(LOGOUT_URL);
};

export const forgotPassword = async (email: string) => {
	return await api.post(FORGOT_PASSWORD_URL, { email });
};

export const changePassword = async (data: ChangePasswordForm) => {
	return await api.post(CHANGE_PASSWORD_URL, data);
};

export const getMenus = async (key: string) => await api.get<Menu[]>(MENUS_URL);
