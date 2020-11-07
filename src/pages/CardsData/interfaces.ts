import { Card } from 'common/utils';

interface Contact {
	id: string;
	name: string;
	type: string;
}

export interface CardData {
	type: string;
	number: string;
	tpNumber: string;
	createdAt: string;
	currency: string;
	contactName: string;
	contactType: string;
	contactPhone: string;
	amount: number;
	status: string;
}

export const mapCardData = (cards: Card[]): CardData[] => {
	return cards.map(
		({ cardType, code, createdAt, contact, tpCode, status, balance }) => ({
			type: cardType?.name,
			number: code,
			tpNumber: tpCode,
			createdAt: createdAt,
			currency: balance?.currency,
			contactName: contact?.fullName,
			contactType: contact?.type,
			contactPhone: contact?.phone,
			amount: balance?.value,
			status: status,
		}),
	);
};
