import { PreLoad } from 'common/utils';

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
	balance?: number;
	errorMessage?: string;
	lineContent?: string;
}

export const mapPreLoads = (loads: PreLoad[]): TableLoad[] => {
	return loads.map(({ rowIndex, batch, card, errorMessage, lineContent }) => ({
		index: rowIndex,
		number: batch?.tpContractBatchNumber,
		ruc: batch?.client?.ruc,
		name: batch?.client?.name,
		date: batch?.tpContractDate,
		chassis: batch?.tpChasis,
		invoice: batch?.tpInvoiceCode,
		amount: batch?.amount?.value,
		currency: batch?.amount?.currency?.symbol || batch?.amount?.currencySymbol,
		type: batch?.rechargeType?.name,
		reason: batch?.businessArea?.name,
		card: card?.cardType?.name,
		tpNumber: batch?.tpContractNumber,
		errorMessage,
		lineContent,
	}));
};
