import { Account } from 'common/utils';
import { TableAccount } from './columns';

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
