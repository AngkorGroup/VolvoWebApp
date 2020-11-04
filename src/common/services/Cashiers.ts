import { CASHIERS_URL } from 'common/constants/api';
import { api, Cashier } from 'common/utils';

export const getCashiers = async (dealerId: string) => {
	return await api.get<Cashier[]>(CASHIERS_URL, { dealerId });
};

export const addCashier = async (dealer: Partial<Cashier>) => {
	return await api.post<Cashier>(CASHIERS_URL, dealer);
};

export const editCashier = async (dealer: Partial<Cashier>) => {
	return await api.put<Cashier>(CASHIERS_URL, dealer);
};

export const deleteCashier = async (id: string) => {
	return await api.delete(`${CASHIERS_URL}/${id}`);
};
