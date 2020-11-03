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
	batch: string;
	source: string;
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
		({ type, charge, description, transfer, amount: movAmount }) => {
			let amount = movAmount.value;
			let voucherURL = '';
			if (type === CONSUME_TYPE) {
				amount = charge?.amount?.value;
				voucherURL = charge?.imageUrl;
			} else if (type === TRANSFER_TYPE) {
				amount = transfer?.amount?.value;
				voucherURL = transfer?.imageUrl;
			}
			return {
				type,
				operationNumber: charge?.operationCode,
				operationDate: charge?.createdAt,
				reason: description,
				amount,
				dealerName: charge?.cashier?.dealer?.name,
				cashier: charge?.cashier?.fullName,
				batch: '',
				source: transfer?.displayName,
				voucherURL,
			};
		},
	);
};
