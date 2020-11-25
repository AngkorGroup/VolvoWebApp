import {
	GET_BANKS,
	GET_BUSINESS_AREAS,
	GET_CURRENCIES,
	GET_DOCUMENT_TYPES,
	GET_RECHARGE_TYPES,
	GET_SECTORS,
} from 'common/constants';
import { api, CommonValue } from 'common/utils';

export const getQueryBusinessAreas = async (key?: string) => {
	return await api.get<CommonValue[]>(GET_BUSINESS_AREAS);
};

export const getQueryRechargeTypes = async (key?: string) => {
	return await api.get<CommonValue[]>(GET_RECHARGE_TYPES);
};

export const getQuerySectors = async (key?: string) => {
	return await api.get<CommonValue[]>(GET_SECTORS);
};

export const getQueryBanks = async (key?: string) => {
	return await api.get<CommonValue[]>(GET_BANKS);
};

export const getQueryCurrencies = async (key?: string) => {
	return await api.get<CommonValue[]>(GET_CURRENCIES);
};

export const getQueryDocumentTypes = async (key?: string) => {
	return await api.get<CommonValue[]>(GET_DOCUMENT_TYPES);
};
