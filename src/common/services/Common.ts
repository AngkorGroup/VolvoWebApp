import {
	GET_BUSINESS_AREAS,
	GET_RECHARGE_TYPES,
	GET_SECTORS,
} from 'common/constants';
import { api, CommonValue } from 'common/utils';

export const getQueryBusinessAreas = async (key: string) => {
	return await api.get<CommonValue[]>(GET_BUSINESS_AREAS);
};

export const getQueryRechargeTypes = async (key: string) => {
	return await api.get<CommonValue[]>(GET_RECHARGE_TYPES);
};

export const getQuerySectors = async (key: string) => {
	return await api.get<CommonValue[]>(GET_SECTORS);
};
