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
