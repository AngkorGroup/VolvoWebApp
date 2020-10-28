import { create } from 'apisauce';
import UserRepository from 'common/repository/UserRepository';

// TODO: handle baseUrl with .env file
const BASE_URL =
	'http://volvocashapi-test.us-east-2.elasticbeanstalk.com/api_web';

export const api = create({
	baseURL: BASE_URL,
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
