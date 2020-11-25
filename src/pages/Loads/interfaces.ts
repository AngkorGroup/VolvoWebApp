import { Load } from 'common/utils';

export interface TableLoad {
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
	balance: number;
}

export const mapLoads = (loads: Load[]): TableLoad[] => {
	return loads.map((l) => ({
		number: l.tpContractNumber,
		ruc: l.client?.ruc,
		name: l.client?.name,
		date: l.tpContractDate,
		chassis: l.tpChasis,
		invoice: l.tpInvoiceCode,
		amount: l.amount?.value,
		currency: l.amount?.currency?.symbol || l.amount?.currencySymbol,
		type: l.rechargeType?.name,
		reason: l.businessArea?.name,
		card: l.cardType.name,
		tpNumber: l.tpContractBatchNumber,
		balance: l.balance?.value,
	}));
};
