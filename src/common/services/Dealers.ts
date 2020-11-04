import { DEALERS_URL, DEALERS_BY_FILTER_URL } from 'common/constants/api';
import { api, Dealer } from 'common/utils';

export const getDealers = async () => {
	return await api.get<Dealer[]>(DEALERS_URL);
};

export const getDealersByFilter = async (query: string) => {
	return await api.get<Dealer[]>(DEALERS_BY_FILTER_URL, { query });
};

export const addDealer = async (dealer: Partial<Dealer>) => {
	return await api.post<Dealer>(DEALERS_URL, dealer);
};

export const editDealer = async (dealer: Partial<Dealer>) => {
	return await api.put<Dealer>(DEALERS_URL, dealer);
};

export const deleteDealer = async (id: string) => {
	return await api.delete(`${DEALERS_URL}/${id}`);
};
