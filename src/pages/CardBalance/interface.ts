interface Dealer {
	id: string;
	name: string;
}

interface Operation {
	number: string;
	date: string;
}

export interface Movement {
	type: string;
	operation: Operation;
	reason: string;
	amount: string;
	dealer: Dealer;
	cashier: string;
	batch: string;
	source: string;
	voucherURL: string;
}

export interface Expiration {
	type: string;
	number: string;
	batch: string;
	currency: string;
	balance: string;
	expirationDate: string;
}

export interface Card {
	id: string;
	type: string;
	name: string;
	balance: string;
}

export interface Batch {
	number: string;
	batch: string;
	expirationDate: string;
	currency: string;
	balance: string;
}
