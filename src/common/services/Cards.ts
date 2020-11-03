import {
	CARD_URL,
	CARDS_BY_CLIENT,
	CARDS_BY_CLIENT_CARD_TYPE,
	CARDS_BY_FILTER,
} from 'common/constants/api';
import { api, BatchMovement, Card } from 'common/utils';

export const getCardsByFilter = async (query?: string) => {
	const pathQuery = query ? `?query=${query}` : '';
	return await api.get<Card[]>(`${CARDS_BY_FILTER}${pathQuery}`);
};

export const getCardsByClient = (byContact?: boolean) => async (
	param: string,
) => {
	const pathParam = byContact ? { contactId: param } : { clientId: param };
	return await api.get<Card[]>(CARDS_BY_CLIENT, pathParam);
};

export const getCardsByClientCardType = async (
	clientId: string,
	cardTypeId: string,
) => {
	return await api.get<Card[]>(CARDS_BY_CLIENT_CARD_TYPE, {
		clientId,
		cardTypeId,
	});
};

export const getCardsBatchMovements = async (
	cardId: string,
	batchId: string,
) => {
	return await api.get<BatchMovement[]>(
		`${CARD_URL}/${cardId}/batchs/${batchId}/movements`,
	);
};
