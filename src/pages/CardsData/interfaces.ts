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
	status: string;
}

export const mapCardData = (cards: Card[]): CardData[] => {
	return cards.map(
		({ cardType, code, createdAt, contact, tpCode, status }) => ({
			type: cardType?.name,
			number: code,
			tpNumber: tpCode,
			createdAt: createdAt,
			currency: cardType?.currency,
			contactName: contact?.fullName,
			contactType: contact?.type,
			contactPhone: contact?.phone,
			status: status,
		}),
	);
};
