import {
	CLIENT_URL,
	GET_CLIENT_BY_FILTER_URL,
	GET_CLIENT_BY_PAGINATION_URL,
} from 'common/constants/api';
import { api, CardTypeSummary, Client } from 'common/utils';

export const getClients = async (query?: string, onlyActive?: boolean) => {
	const response = await api.get<Client[]>(GET_CLIENT_BY_FILTER_URL, {
		query,
		onlyActive,
	});
	return response;
};

export const getReportClients = async (key: string, onlyActive?: boolean) => {
	return await getClients(undefined, onlyActive);
};

export const getQueryClients = async (
	key: string,
	query?: string,
	onlyActive?: boolean,
) => {
	return await getClients(query, onlyActive);
};

export const getClientsByPagination = async (
	key: string,
	query?: string,
	onlyActive?: boolean,
) => {
	return await api.get<Client[]>(GET_CLIENT_BY_PAGINATION_URL, {
		query,
		onlyActive,
		pageLength: '10000',
	});
};

export const getClientCardTypes = async (clientId: string) => {
	return await api.get<CardTypeSummary[]>(
		`${CLIENT_URL}/${clientId}/card_types_summary`,
	);
};
