import { CardBatch, CardTypeSummary } from 'common/utils';

export interface BatchMovementRow {
	cardNumber: string;
	number: string;
	date: string;
	currency: string;
	amount: string;
	dealer: string;
	cashier: string;
	batch: string;
	voucherURL: string;
}

export interface CardBatchRow {
	number: string;
	batch: string;
	expiration: string;
	currency: string;
	balance: number;
}

export interface ClientCardRow {
	cardId: string;
	number: string;
	contact: string;
	currency: string;
	balance: number;
}

export interface CardType {
	id: string;
	cardName: string;
	cardType: string;
	currency: string;
	balance: number;
}

export interface VolvoCardData {
	type: string;
	number?: string;
	balance: number;
	name: string;
	currency: string;
}

export interface Expiration {
	cardType: string;
	cardNumber: string;
	batch: string;
	expiration: string;
	currency: string;
	balance: number;
}

export const mapCardType = (cardTypes: CardTypeSummary[]): CardType[] => {
	return cardTypes.map((ct) => ({
		id: `${ct.id}`,
		cardName: ct.displayName,
		cardType: ct.name,
		currency: ct.sum.currency,
		balance: ct.sum.value,
	}));
};

export const mapExpirations = (expirations: CardBatch[]): Expiration[] => {
	return expirations.map(({ card, batchId, expiresAt, balance }) => ({
		cardType: card.cardType?.name,
		cardNumber: card.code,
		batch: `${batchId}`,
		expiration: expiresAt,
		currency: balance.currency,
		balance: balance.value,
	}));
};
