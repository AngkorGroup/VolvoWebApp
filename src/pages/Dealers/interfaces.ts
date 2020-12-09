import { Dealer } from 'common/utils';
import { AccountForm } from 'common/validations';

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
	archiveAt: string;
}

export type DealerForm = Partial<TableDealer>;

export type BankAccountForm = { id?: string; dealerId?: string } & AccountForm;

export const mapDealer = (dealers: Dealer): TableDealer => ({
	id: `${dealers.id}`,
	code: dealers.tpCode,
	name: dealers.name,
	ruc: dealers.ruc,
	address: dealers.address,
	status: dealers.status,
	type: dealers.type,
	phone: dealers.phone,
	zone: dealers.zone,
	maxCashiers: dealers.maxCashiers,
	archiveAt: dealers.archiveAt,
});

export const mapDealers = (dealers: Dealer[]): TableDealer[] => {
	return dealers.map(mapDealer);
};
