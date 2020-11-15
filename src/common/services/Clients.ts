import {
	CLIENT_URL,
	GET_CLIENT_BY_FILTER_URL,
	GET_CLIENT_BY_PAGINATION_URL,
} from 'common/constants/api';
import { api, CardTypeSummary, Client } from 'common/utils';

export const getClients = async (query?: string) => {
	const response = await api.get<Client[]>(GET_CLIENT_BY_FILTER_URL, { query });
	return response;
};

export const getQueryClients = async (key: string, query?: string) => {
	return await getClients(query);
};

export const getClientsByPagination = async (
	key: string,
	query?: string,
	onlyActive?: boolean,
) => {
	return await api.get<Client[]>(GET_CLIENT_BY_PAGINATION_URL, {
		query,
		onlyActive,
	});
};

export const getClientCardTypes = async (clientId: string) => {
	return await api.get<CardTypeSummary[]>(
		`${CLIENT_URL}/${clientId}/card_types_summary`,
	);
};
