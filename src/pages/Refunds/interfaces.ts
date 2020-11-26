import { REFUND_GENERATED, REFUND_SCHEDULED } from 'common/constants';
import { Account, Charge, Refund } from 'common/utils';

export interface RefundColumn {
	id: string;
	settlement: string;
	dealer: string;
	currency: string;
	amount: number;
	date: string;
}

export interface Consume {
	id: string;
	voucher: string;
	paymentType: string;
	status: string;
	cardType: string;
	cardNumber: string;
	cashier: string;
	client: string;
	date: string;
	contact: string;
	currency: string;
	amount: number;
	voucherURL: string;
}

export const mapRefunds = (refunds: Refund[]): RefundColumn[] => {
	return refunds.map((r) => ({
		id: `${r.id}`,
		settlement: `${r.id}`,
		dealer: `${r.dealer?.tpCode} - ${r.dealer?.name}`,
		currency: r.amount?.currency?.symbol || r.amount.currencySymbol,
		amount: r.amount?.value,
		date: r.date,
	}));
};

export const mapCharges = (charges: Charge[]): Consume[] => {
	return charges.map(
		({
			id,
			operationCode,
			cashier,
			chargeType,
			status,
			card,
			createdAt,
			amount,
			imageUrl,
		}) => ({
			id: `${id}`,
			voucher: operationCode,
			paymentType: chargeType,
			status: status,
			cardType: card?.cardType?.name,
			cardNumber: card?.code,
			cashier: cashier?.fullName,
			client: card?.contact?.client?.name,
			date: createdAt,
			contact: card?.contact?.fullName,
			currency: amount.currency?.symbol || amount.currencySymbol,
			amount: amount.value,
			voucherURL: imageUrl,
		}),
	);
};

export const mapBankAccounts = (accounts: Account[]) => {
	return accounts.map((a) => ({
		value: `${a.id}`,
		label: `${a.bankAccountType?.name} ${a.account}`,
	}));
};

export const isGenerated = (status: string) => status === REFUND_GENERATED;

export const isScheduled = (status: string) => status === REFUND_SCHEDULED;
