import { Dealer } from '../Dealers/interfaces';

export interface POS {
	id: string;
	dealer: Partial<Dealer>;
	code: string;
	phone: string;
}

export type POSForm = Partial<POS>;
