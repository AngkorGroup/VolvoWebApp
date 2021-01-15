import { Load } from 'common/utils';

export interface TableLoad {
	id: string;
	number: string;
	ruc: string;
	name: string;
	date: string;
	chassis: string;
	invoice: string;
	amount: number;
	currency: string;
	type: string;
	reason: string;
	card: string;
	tpNumber: string;
	dealer: string;
	contactName: string;
	contactPhone: string;
	createdBy?: string;
	createdAt?: string;
	errorMessage?: string;
	lineContent?: string;
}

export const mapLoads = (loads: Load[]): TableLoad[] => {
	return loads.map((l) => ({
		id: `${l.id}`,
		number: l.tpContractBatchNumber,
		ruc: l.client?.ruc,
		name: l.client?.name,
		date: l.tpContractDate,
		chassis: l.tpChasis,
		invoice: l.tpInvoiceCode,
		amount: l.amount?.value,
		currency: l.amount?.currency?.symbol || l.amount?.currencySymbol,
		type: l.rechargeType?.tpCode,
		reason: l.businessArea?.name,
		card: l.cardType?.name,
		tpNumber: l.tpContractNumber,
		balance: l.balance?.value,
		dealer: l.dealerName,
		contactName: l.client?.mainContact?.fullName,
		contactPhone: l.client?.mainContact?.phone,
		createdBy: l.createdBy,
		createdAt: l.createdAt,
	}));
};
