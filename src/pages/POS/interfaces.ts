import { Cashier } from 'common/utils';

export interface POS {
	id: string;
	userId: string;
	dealer: string;
	imei: string;
	tpCode: string;
	phone: string;
	email: string;
	status: string;
	fullName: string;
	firstName: string;
	lastName: string;
	archiveAt: string;
}

export type POSForm = Partial<POS>;

export const mapCashier = (cashier: Cashier): POS => ({
	id: `${cashier.id}`,
	userId: `${cashier.userId}`,
	dealer: cashier.dealer?.name,
	imei: cashier.imei,
	tpCode: cashier.tpCode,
	phone: cashier.phone,
	email: cashier.email,
	status: cashier.status,
	fullName: cashier.fullName,
	firstName: cashier.firstName,
	lastName: cashier.lastName,
	archiveAt: cashier.archiveAt,
});

export const mapCashiers = (cashiers: Cashier[]): POS[] => {
	return cashiers.map(mapCashier);
};
