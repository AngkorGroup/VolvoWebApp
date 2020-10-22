import { Card } from '../CardBalance/interface';

export interface CardType {
	id: string;
	type: string;
	description: string;
	currency: string;
	term: string;
	imgURL: string;
	createdAt: string;
	status: string;
	deletedAt: string;
}

export type CardTypeForm = Partial<CardType> & {
	logo: File | null;
};
