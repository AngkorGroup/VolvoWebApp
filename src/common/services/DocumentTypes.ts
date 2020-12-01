import { DOCUMENT_TYPES_URL } from 'common/constants/api';
import { api, CommonValue } from 'common/utils';

export const getDocumentTypes = async (onlyActive?: boolean) => {
	return await api.get<CommonValue[]>(DOCUMENT_TYPES_URL, { onlyActive });
};

export const getQueryDocumentTypes = async (
	key: string,
	onlyActive?: boolean,
) => {
	return await getDocumentTypes(onlyActive);
};

export const addDocumentType = async (account: any) => {
	return await api.post<CommonValue>(DOCUMENT_TYPES_URL, account);
};

export const editDocumentType = async (account: any) => {
	return await api.put<CommonValue>(DOCUMENT_TYPES_URL, account);
};

export const deleteDocumentType = async (id: string) => {
	return await api.delete(`${DOCUMENT_TYPES_URL}/${id}`);
};
