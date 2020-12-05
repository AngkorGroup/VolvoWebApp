import { BANK_ACCOUNT_TYPES_URL } from 'common/constants/api';
import { CommonValue, api } from 'common/utils';

export const getBankAccountTypes = async (onlyActive?: boolean) => {
	return await api.get<CommonValue[]>(BANK_ACCOUNT_TYPES_URL, { onlyActive });
};

export const getQueryBankAccountTypes = async (
	key: string,
	onlyActive?: boolean,
) => {
	return await getBankAccountTypes(onlyActive);
};

export const addBankAccountTypes = async (bankAccountType: any) => {
	return await api.post<CommonValue>(BANK_ACCOUNT_TYPES_URL, bankAccountType);
};

export const editBankAccountType = async (bankAccountType: any) => {
	return await api.put<CommonValue>(BANK_ACCOUNT_TYPES_URL, bankAccountType);
};

export const deleteBankAccountType = async (id: string) => {
	return await api.delete(`${BANK_ACCOUNT_TYPES_URL}/${id}`);
};
