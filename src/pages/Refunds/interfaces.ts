import { Charge, Refund } from 'common/utils';

export interface RefundColumn {
	id: string;
	settlement: string;
	dealer: string;
	currency: string;
	amount: number;
	date: string;
	status: string;
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
		settlement: `${r.settlement}`,
		dealer: `${r.dealer?.tpCode} - ${r.dealer?.name}`,
		currency: r.amount?.currency,
		amount: r.amount?.value,
		date: r.date,
		status: r.status,
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
			cashier: cashier.fullName,
			client: card?.contact?.client?.name,
			date: createdAt,
			contact: card?.contact?.fullName,
			currency: amount.currency,
			amount: amount.value,
			voucherURL: imageUrl,
		}),
	);
};
