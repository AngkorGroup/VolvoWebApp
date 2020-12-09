import {
	BATCHES_URL,
	BATCHES_BY_CLIENT_URL,
	BATCHES_BY_CARD_URL,
} from 'common/constants/api';
import { api, CardBatch } from 'common/utils';

export const getClientBatches = async (clientId: string) => {
	return await api.get<CardBatch[]>(BATCHES_BY_CLIENT_URL, { clientId });
};

export const getCardBatches = async (cardId: string) => {
	return await api.get<CardBatch[]>(BATCHES_BY_CARD_URL, { cardId });
};

export const extendExpiredDate = async (id: string, newExpiredDate: string) => {
	return await api.post(`${BATCHES_URL}/${id}/extend_expired_date`, {
		newExpiredDate,
	});
};

export const getQueryCardBatches = async (key: string, cardId: string) => {
	return await getCardBatches(cardId);
};
