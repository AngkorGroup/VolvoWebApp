import { CardBatch, Movement, MovementType } from 'common/utils';

export interface CardMovement {
	id: string;
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
	chassis: string;
	currency: string;
	balance: number;
	expirationDate: string;
	expiresAtExtent: string;
}

export interface Batch {
	number: string;
	batch: string;
	expirationDate: string;
	currency: string;
	balance: string;
}

export const mapExpirations = (batches: CardBatch[]): Expiration[] => {
	return batches.map(
		({ card, batchId, balance, expiresAt, expiresAtExtent, batch }) => ({
			type: card?.cardType?.name,
			number: card?.code,
			batch: `${batchId}`,
			chassis: batch?.tpChasis,
			currency: balance.currency?.symbol || balance.currencySymbol,
			balance: balance.value,
			expirationDate: expiresAt,
			expiresAtExtent: expiresAtExtent,
		}),
	);
};

export const mapMovements = (movements: Movement[]): CardMovement[] => {
	return movements.map(
		({ batchId, type, charge, description, transfer, amount, createdAt }) => {
			let voucherURL = '';
			let operationNumber = '';
			let id = '';
			if (type === MovementType.Consume) {
				operationNumber = charge?.operationCode;
				voucherURL = charge?.imageUrl;
			} else if (
				type === MovementType.TransferOut ||
				type === MovementType.TransferIn
			) {
				operationNumber = transfer?.operationCode;
				voucherURL = transfer?.imageUrl;
			} else if (type === MovementType.Recharge) {
				id = `${batchId}`;
			}
			return {
				id,
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
