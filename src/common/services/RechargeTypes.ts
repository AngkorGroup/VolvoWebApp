import { RECHARGE_TYPES_URL } from 'common/constants/api';
import { api, CommonValue } from 'common/utils';

export const getRechargeTypes = async (onlyActive?: boolean) => {
	return await api.get<CommonValue[]>(RECHARGE_TYPES_URL, { onlyActive });
};

export const getQueryRechargeTypes = async (
	key: string,
	onlyActive?: boolean,
) => {
	return await getRechargeTypes(onlyActive);
};

export const addRechargeType = async (account: any) => {
	return await api.post<CommonValue>(RECHARGE_TYPES_URL, account);
};

export const editRechargeType = async (account: any) => {
	return await api.put<CommonValue>(RECHARGE_TYPES_URL, account);
};

export const deleteRechargeType = async (id: string) => {
	return await api.delete(`${RECHARGE_TYPES_URL}/${id}`);
};
