import { Cashier } from 'common/utils';

export interface POS {
	id: string;
	dealer: string;
	imei: string;
	tpCode: string;
	phone: string;
	email: string;
	firstName: string;
	lastName: string;
	archiveAt: string;
}

export type POSForm = Partial<POS>;

export const mapCashier = (cashier: Cashier): POS => ({
	id: `${cashier.id}`,
	dealer: cashier.dealer?.name,
	imei: cashier.imei,
	tpCode: cashier.tpCode,
	phone: cashier.phone,
	email: cashier.email,
	firstName: cashier.firstName,
	lastName: cashier.lastName,
	archiveAt: cashier.archiveAt,
});

export const mapCashiers = (cashiers: Cashier[]): POS[] => {
	return cashiers.map(mapCashier);
};
