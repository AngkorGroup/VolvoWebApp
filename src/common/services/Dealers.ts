import { DEALERS_URL, DEALERS_BY_FILTER_URL } from 'common/constants/api';
import { api, Cashier, Charge, Dealer, Account } from 'common/utils';

export const getDealers = async (onlyActive?: boolean) => {
	return await api.get<Dealer[]>(DEALERS_URL, { onlyActive });
};

export const getQueryOnlyDealers = async (
	key: string,
	onlyActive?: boolean,
) => {
	return await getDealers(onlyActive);
};

export const getQueryDealers = async (
	key: string,
	query?: string,
	onlyActive?: boolean,
) => {
	return await getDealersByFilter(query, onlyActive);
};

export const getDealersByFilter = async (
	query?: string,
	onlyActive?: boolean,
) => {
	return await api.get<Dealer[]>(DEALERS_BY_FILTER_URL, { query, onlyActive });
};

export const getDealerAccounts = async (id: string, onlyActive?: boolean) => {
	return await api.get<Account[]>(`${DEALERS_URL}/${id}/bank_accounts`, {
		onlyActive,
	});
};

export const getQueryDealerAccounts = async (
	key: string,
	id: string,
	onlyActive?: boolean,
) => {
	return await getDealerAccounts(id, onlyActive);
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

export const getQueryDealerCashiers = async (
	key: string,
	id: string,
	onlyActive?: boolean,
) => {
	return await getDealerCashiers(id, onlyActive);
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
