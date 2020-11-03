import {
	CLIENT_URL,
	GET_CLIENT_BY_FILTER_URL,
	GET_CLIENT_BY_PAGINATION_URL,
} from 'common/constants/api';
import { api, CardTypeSummary, Client } from 'common/utils';

export const getClients = async (query?: string) => {
	const pathQuery = query ? `?query=${query}` : '';
	const response = await api.get<Client[]>(
		`${GET_CLIENT_BY_FILTER_URL}${pathQuery}`,
	);
	return response;
};

export const getClientsByPagination = async (query?: string) => {
	return await api.get<Client[]>(GET_CLIENT_BY_PAGINATION_URL, { query });
};

export const getClientCardTypes = async (clientId: string) => {
	return await api.get<CardTypeSummary[]>(
		`${CLIENT_URL}/${clientId}/card_types_summary`,
	);
};
