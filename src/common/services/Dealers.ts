import { DEALERS_URL, DEALERS_BY_FILTER_URL } from 'common/constants/api';
import { api, Cashier, Charge, Dealer } from 'common/utils';

export const getDealers = async (onlyActive?: boolean) => {
	return await api.get<Dealer[]>(DEALERS_URL, { onlyActive });
};

export const getDealersByFilter = async (query?: string) => {
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

export const getDealerCashiers = async (id: string, onlyActive?: boolean) => {
	return await api.get<Cashier[]>(`${DEALERS_URL}/${id}/cashiers`, {
		onlyActive,
	});
};

export const getDealerCharges = async (
	id: string,
	beginDate?: string,
	endDate?: string,
	cashierId?: string,
	cardTypesList?: string[],
) => {
	const cardTypes = cardTypesList?.join(',');
	const params = {
		beginDate,
		endDate,
		cashierId,
		cardTypes,
	};
	return await api.get<Charge[]>(`${DEALERS_URL}/${id}/charges`, params);
};
