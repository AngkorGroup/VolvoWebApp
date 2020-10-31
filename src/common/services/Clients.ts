import { GET_CLIENT_URL } from 'common/constants/api';
import { api, Client } from 'common/utils';

export const getClients = async (query?: string) => {
	const pathQuery = query ? `?query=${query}` : '';
	const response = await api.get<Client[]>(`${GET_CLIENT_URL}${pathQuery}`);
	return response;
};
