import {
	GET_BANKS,
	GET_CURRENCIES,
} from 'common/constants';
import { Account, api, CommonValue } from 'common/utils';

export const getQueryBanks = async (key?: string) => {
	return await api.get<CommonValue[]>(GET_BANKS);
};

export const getQueryCurrencies = async (key?: string) => {
	return await api.get<CommonValue[]>(GET_CURRENCIES);
};

export const getCommonBankAccounts = async (id: string) => {
	return await api.get<Account[]>(`${GET_BANKS}/${id}/accounts`);
};

export const getQueryCommonBankAccounts = async (key: string, id: string) => {
	return await getCommonBankAccounts(id);
};
