import { LOGIN_URL, LOGOUT_URL } from 'common/constants';
import { api, LoginResponse } from 'common/utils';

export const login = async (email: string, password: string) => {
	return await api.post<LoginResponse>(LOGIN_URL, { email, password });
};

export const logout = async () => {
	return await api.delete(LOGOUT_URL);
};
