import { Load, PreLoad } from 'common/utils';

export interface TableLoad {
	index?: number;
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
	errorMessage?: string;
	lineContent?: string;
}

export const mapLoads = (loads: Load[]): TableLoad[] => {
	return loads.map((l) => ({
		number: l.tpContractBatchNumber,
		ruc: l.client?.ruc,
		name: l.client?.name,
		date: l.tpContractDate,
		chassis: l.tpChasis,
		invoice: l.tpInvoiceCode,
		amount: l.amount?.value,
		currency: l.amount?.currency?.symbol || l.amount?.currencySymbol,
		type: l.rechargeType?.name,
		reason: l.businessArea?.name,
		card: l.cardType?.name,
		tpNumber: l.tpContractNumber,
		balance: l.balance?.value,
	}));
};

export const mapPreLoads = (loads: PreLoad[]): TableLoad[] => {
	return loads.map(
		({ rowIndex, batch, contact, card, errorMessage, lineContent }) => ({
			index: rowIndex,
			number: batch?.tpContractBatchNumber,
			ruc: contact?.client?.ruc,
			name: contact?.client?.name,
			date: batch?.tpContractDate,
			chassis: batch?.tpChasis,
			invoice: batch?.tpInvoiceCode,
			amount: batch?.amount?.value,
			currency:
				batch?.amount?.currency?.symbol || batch?.amount?.currencySymbol,
			type: batch?.rechargeType?.name,
			reason: batch?.businessArea?.name,
			card: card?.cardType?.name,
			tpNumber: batch?.tpContractNumber,
			balance: card?.balance?.value,
			errorMessage,
			lineContent,
		}),
	);
};
