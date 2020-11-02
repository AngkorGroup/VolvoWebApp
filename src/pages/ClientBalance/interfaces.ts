export interface BatchMovementRow {
	cardNumber: string;
	number: string;
	date: string;
	currency: string;
	amount: string;
	dealer: string;
	cashier: string;
	batch: string;
	voucherURL: string;
}

export interface CardBatchRow {
	number: string;
	batch: string;
	expiration: string;
	currency: string;
	balance: string;
}

export interface ClientCardRow {
	number: string;
	contact: string;
	currency: string;
	balance: number;
}

export interface CardType {
	id: string;
	cardType: string;
	currency: string;
	balance: string;
}

export interface VolvoCardData {
	type: string;
	number: string;
	balance: string;
}
