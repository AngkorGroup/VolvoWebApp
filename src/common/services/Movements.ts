import { GET_MOVEMENTS_BY_CARD_URL } from 'common/constants/api';
import { api, Movement } from 'common/utils';

export const getMovementsByCard = async (cardId: string) => {
	return await api.get<Movement[]>(GET_MOVEMENTS_BY_CARD_URL, { cardId });
};

export const getQueryMovementsByCard = async (key: string, cardId: string) => {
	return await getMovementsByCard(cardId);
};
