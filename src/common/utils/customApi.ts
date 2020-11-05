import { create } from 'apisauce';
import UserRepository from 'common/repository/UserRepository';

export const api = create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		Authorization: `Bearer ${UserRepository.getToken()}`,
	},
});

export const setAuthToken = (token: string) => {
	api.setHeaders({
		Authorization: `Bearer ${token}`,
	});
};

export const removeAuthToken = () => {
	api.setHeaders({
		Authorization: '',
	});
};
