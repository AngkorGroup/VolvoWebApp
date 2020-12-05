import { BUSINESS_AREAS_URL } from 'common/constants/api';
import { api, CommonValue } from 'common/utils';

export const getBusinessAreas = async (onlyActive?: boolean) => {
	return await api.get<CommonValue[]>(BUSINESS_AREAS_URL, { onlyActive });
};

export const getQueryBusinessAreas = async (
	key: string,
	onlyActive?: boolean,
) => {
	return await getBusinessAreas(onlyActive);
};

export const addBusinessArea = async (account: any) => {
	return await api.post<CommonValue>(BUSINESS_AREAS_URL, account);
};

export const editBusinessArea = async (account: any) => {
	return await api.put<CommonValue>(BUSINESS_AREAS_URL, account);
};

export const deleteBusinessArea = async (id: string) => {
	return await api.delete(`${BUSINESS_AREAS_URL}/${id}`);
};
