import { Cashier } from 'common/utils';

export interface POS {
	id: string;
	dealer: string;
	imei: string;
	code: string;
	phone: string;
	email: string;
	firstName: string;
	lastName: string;
}

export type POSForm = Partial<POS>;

export const mapCashiers = (cashiers: Cashier[]): POS[] => {
	return cashiers.map((c) => ({
		id: `${c.id}`,
		dealer: c.dealer?.name,
		imei: c.imei,
		code: c.tpCode,
		phone: c.phone,
		email: c.email,
		firstName: c.firstName,
		lastName: c.lastName,
	}));
};
