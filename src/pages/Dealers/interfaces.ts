import { Account, Dealer } from 'common/utils';
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

export interface TableAccount {
	id: string;
	account: string;
	cci: string;
	currency: string;
	isDefault: boolean;
	bankAccountType: string;
	bank: string;
	archiveAt: string;
	currencyId: string;
	bankAccountTypeId: string;
	bankId: string;
}

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

export const mapAccounts = (accounts: Account[]): TableAccount[] => {
	return accounts.map((acc) => ({
		id: `${acc.id}`,
		account: acc.account,
		cci: acc.cci,
		currency: acc.currency?.symbol,
		isDefault: acc.isDefault,
		bankAccountType: acc.bankAccountType?.name,
		bank: acc.bank?.name,
		archiveAt: acc.archiveAt,
		currencyId: `${acc.currencyId}`,
		bankAccountTypeId: `${acc.bankAccountTypeId}`,
		bankId: `${acc.bankId}`,
	}));
};
