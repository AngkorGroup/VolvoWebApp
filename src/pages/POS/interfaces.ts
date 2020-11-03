import { TableDealer } from '../Dealers/interfaces';

export interface POS {
	id: string;
	dealer: Partial<TableDealer>;
	code: string;
	phone: string;
	email: string;
}

export type POSForm = Partial<POS>;
