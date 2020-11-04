import { Cashier } from 'common/utils';

export interface POS {
	id: string;
	dealer: string;
	code: string;
	phone: string;
	email: string;
}

export type POSForm = Partial<POS>;

export const mapCashiers = (cashiers: Cashier[]): POS[] => {
	return cashiers.map((c) => ({
		id: `${c.id}`,
		dealer: c.dealer?.name,
		code: c.tpCode,
		phone: c.phone,
		email: c.email,
	}));
};
