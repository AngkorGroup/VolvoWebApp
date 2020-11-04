import { CONSUME_TYPE, TRANSFER_TYPE } from 'common/constants/constants';
import { CardBatch, Movement } from 'common/utils';

export interface CardMovement {
	type: string;
	operationNumber: string;
	operationDate: string;
	reason: string;
	amount: number;
	dealerName: string;
	cashier: string;
	source: string;
	chargeStatus: string;
	voucherURL: string;
}

export interface Expiration {
	type: string;
	number: string;
	batch: string;
	currency: string;
	balance: number;
	expirationDate: string;
}

export interface Batch {
	number: string;
	batch: string;
	expirationDate: string;
	currency: string;
	balance: string;
}

export const mapExpirations = (batches: CardBatch[]): Expiration[] => {
	return batches.map(({ card, batchId, balance, expiresAt }) => ({
		type: card?.cardType?.name,
		number: card?.code,
		batch: `${batchId}`,
		currency: balance.currency,
		balance: balance.value,
		expirationDate: expiresAt,
	}));
};

export const mapMovements = (movements: Movement[]): CardMovement[] => {
	return movements.map(
		({ type, charge, description, transfer, amount, createdAt }) => {
			let voucherURL = '';
			let operationNumber = '';
			if (type === CONSUME_TYPE) {
				operationNumber = charge?.operationCode;
				voucherURL = charge?.imageUrl;
			} else if (type === TRANSFER_TYPE) {
				operationNumber = transfer?.operationCode;
				voucherURL = transfer?.imageUrl;
			}
			return {
				type,
				operationNumber,
				operationDate: createdAt,
				reason: description,
				amount: amount.value,
				dealerName: charge?.cashier?.dealer?.name,
				cashier: charge?.cashier?.fullName,
				source: transfer?.displayName,
				voucherURL,
				chargeStatus: charge?.status,
			};
		},
	);
};
