import { CardType } from 'common/utils';

export interface TableCardType {
	id: string;
	type: string;
	description: string;
	currency: string;
	term: string;
	color: string;
	createdAt: string;
	status: string;
	deletedAt: string;
}

export type CardTypeForm = Partial<TableCardType>;

export const mapCardType = (cardTypes: CardType[]): TableCardType[] => {
	return cardTypes.map((ct) => ({
		id: `${ct.id}`,
		type: ct.name,
		description: ct.displayName,
		currency: ct.currency,
		term: `${ct.term / 30}`,
		color: ct.color,
		createdAt: ct.createdAt,
		status: ct.status,
		deletedAt: ct.deletedAt,
	}));
};
