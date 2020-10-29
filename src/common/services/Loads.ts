import { LOADS_URL } from 'common/constants/api';
import { api, Load, LoadError } from 'common/utils';

export const getLoads = async () => {
	return await api.get<Load[]>(LOADS_URL);
};

export const getLoadErrors = async () => {
	return await api.get<LoadError[]>(`${LOADS_URL}/errors`);
};

export const massiveUpload = async (file: File) => {
	const data = new FormData();
	data.append('file', file);
	return await api.post<LoadError[]>(LOADS_URL, data);
};
