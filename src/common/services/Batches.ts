import { BATCHES_BY_CLIENT_URL } from 'common/constants/api';
import { api, CardBatch } from 'common/utils';

export const getClientBatches = async (clientId: string) => {
	return await api.get<CardBatch[]>(BATCHES_BY_CLIENT_URL, { clientId });
};
