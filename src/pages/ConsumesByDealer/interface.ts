import { Charge } from 'common/utils';

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
