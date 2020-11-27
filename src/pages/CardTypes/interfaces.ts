import { CardType } from 'common/utils';

export interface TableCardType {
	id: string;
	type: string;
	description: string;
	currency: string;
	currencyId: string;
	term: string;
	color: string;
	createdAt: string;
	status: string;
	archiveAt: string;
	tpCode: string;
}

export type CardTypeForm = Partial<TableCardType>;

export const mapCardType = (cardTypes: CardType): TableCardType => ({
	id: `${cardTypes.id}`,
	type: cardTypes.name,
	description: cardTypes.displayName,
	currency: cardTypes.currency?.symbol,
	currencyId: `${cardTypes.currency?.id}`,
	term: `${cardTypes.term}`,
	color: cardTypes.color,
	createdAt: cardTypes.createdAt,
	status: cardTypes.status,
	archiveAt: cardTypes.archiveAt,
	tpCode: cardTypes.tpCode,
});

export const mapCardTypes = (cardTypes: CardType[]): TableCardType[] => {
	return cardTypes.map(mapCardType);
};
