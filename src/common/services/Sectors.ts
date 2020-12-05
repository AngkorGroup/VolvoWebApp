import { SECTORS_URL } from 'common/constants/api';
import { api, CommonValue } from 'common/utils';

export const getSectors = async (onlyActive?: boolean) => {
	return await api.get<CommonValue[]>(SECTORS_URL, { onlyActive });
};

export const getQuerySectors = async (
	key: string,
	onlyActive?: boolean,
) => {
	return await getSectors(onlyActive);
};

export const addSector = async (account: any) => {
	return await api.post<CommonValue>(SECTORS_URL, account);
};

export const editSector = async (account: any) => {
	return await api.put<CommonValue>(SECTORS_URL, account);
};

export const deleteSector = async (id: string) => {
	return await api.delete(`${SECTORS_URL}/${id}`);
};
