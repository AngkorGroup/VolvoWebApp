import { BANK_ACCOUNTS_URL } from 'common/constants/api';
import { Account, api } from 'common/utils';

export const getBankAccounts = async (onlyActive?: boolean) => {
	return await api.get<Account[]>(BANK_ACCOUNTS_URL, { onlyActive });
};

export const getQueryBankAccounts = async (
	key: string,
	onlyActive?: boolean,
) => {
	return await getBankAccounts(onlyActive);
};

export const addBankAccount = async (account: any) => {
	return await api.post<Account>(BANK_ACCOUNTS_URL, account);
};

export const editBankAccount = async (account: any) => {
	return await api.put<Account>(BANK_ACCOUNTS_URL, account);
};

export const deleteBankAccount = async (id: string) => {
	return await api.delete(`${BANK_ACCOUNTS_URL}/${id}`);
};

export const getVolvoAccounts = async (onlyActive?: boolean) => {
	return await api.get<Account[]>(`${BANK_ACCOUNTS_URL}/volvo`, { onlyActive });
};

export const getQueryVolvoAccounts = async (
	key: string,
	onlyActive?: boolean,
) => {
	return await getVolvoAccounts(onlyActive);
};
