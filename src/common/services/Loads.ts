import {
	BATCHES_ERRORS_URL,
	BATCHES_URL,
	MASSIVE_UPLOAD,
} from 'common/constants/api';
import { api, Load, LoadError } from 'common/utils';

export const getLoads = async () => {
	return await api.get<Load[]>(BATCHES_URL);
};

export const getLoadErrors = async () => {
	return await api.get<LoadError[]>(BATCHES_ERRORS_URL);
};

export const massiveUpload = async (file: File) => {
	const data = new FormData();
	data.append('file', file);
	return await api.post<LoadError[]>(MASSIVE_UPLOAD, data);
};
