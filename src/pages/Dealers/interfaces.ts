import { Dealer } from 'common/utils';

export interface TableDealer {
	id: string;
	code: string;
	name: string;
	ruc: string;
	address: string;
	status: string;
	type: string;
	phone: string;
	zone: string;
	maxCashiers: number;
}

export type DealerForm = Partial<TableDealer>;

export const mapDealers = (dealers: Dealer[]): TableDealer[] => {
	return dealers.map((d) => ({
		id: `${d.id}`,
		code: d.tpCode,
		name: d.name,
		ruc: d.ruc,
		address: d.address,
		status: d.status,
		type: d.type,
		phone: d.phone,
		zone: d.zone,
		maxCashiers: d.maxCashiers,
	}));
};
