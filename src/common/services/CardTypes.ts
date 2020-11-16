import { CARD_TYPES_URL } from 'common/constants/api';
import { api, CardType } from 'common/utils';

export const getCardTypes = async (onlyActive?: boolean) => {
	return await api.get<CardType[]>(CARD_TYPES_URL, { onlyActive });
};

export const getQueryCardTypes = async (key: string, onlyActive?: boolean) => {
	return await getCardTypes(onlyActive);
};

export const addCardType = async (cardType: Partial<CardType>) => {
	return await api.post<CardType>(CARD_TYPES_URL, cardType);
};

export const editCardType = async (cardType: Partial<CardType>) => {
	return await api.put<CardType>(CARD_TYPES_URL, cardType);
};

export const deleteCardType = async (id: string) => {
	return await api.delete(`${CARD_TYPES_URL}/${id}`);
};
