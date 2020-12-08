import {
	BATCHES_ERRORS_URL,
	BATCHES_URL,
	MASSIVE_UPLOAD,
	PRE_MASSIVE_UPLOAD,
} from 'common/constants/api';
import { api, Load, LoadError, PreLoad } from 'common/utils';

export const getLoads = async (beginDate?: string, endDate?: string) => {
	return await api.get<Load[]>(BATCHES_URL, { beginDate, endDate });
};

export const getQueryLoads = async (
	key: string,
	beginDate?: string,
	endDate?: string,
	clientId?: string,
) => {
	return await api.get<Load[]>(BATCHES_URL, { beginDate, endDate, clientId });
};

export const getLoadErrors = async () => {
	return await api.get<LoadError[]>(BATCHES_ERRORS_URL);
};

export const massiveUpload = async (file: File) => {
	const data = new FormData();
	data.append('file', file);
	return await api.post<LoadError[]>(MASSIVE_UPLOAD, data);
};

export const preMassiveUpload = async (file: File) => {
	const data = new FormData();
	data.append('file', file);
	return await api.post<PreLoad[]>(PRE_MASSIVE_UPLOAD, data);
};

export const preQueryMassiveUpload = async (key: string, file: File) => {
	return await preMassiveUpload(file);
};
