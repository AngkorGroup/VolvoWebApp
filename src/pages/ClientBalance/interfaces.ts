import {
	BatchMovement,
	CardBatch,
	CardTypeSummary,
	MovementType,
} from 'common/utils';

export interface BatchMovementRow {
	cardNumber: string;
	number: string;
	date: string;
	currency: string;
	amount: number;
	dealer: string;
	cashier: string;
	batch: string;
	voucherURL: string;
	chargeStatus: string;
	type: string;
}

export interface CardBatchRow {
	number: string;
	batch: string;
	expiration: string;
	currency: string;
	balance: number;
}

export interface ClientCardRow {
	cardId: string;
	number: string;
	contact: string;
	phone: string;
	currency: string;
	balance: number;
}

export interface CardType {
	id: string;
	cardName: string;
	cardType: string;
	cardColor: string;
	currency: string;
	balance: number;
}

export interface VolvoCardData {
	id: string;
	type: string;
	number?: string;
	balance: number;
	name: string;
	currency: string;
	color: string;
}

export interface Expiration {
	cardId: string;
	cardType: string;
	cardNumber: string;
	cardName: string;
	cardBalance: number;
	cardColor: string;
	batch: string;
	chassis: string;
	expiration: string;
	expiresAtExtent: string;
	currency: string;
	balance: number;
	contactName: string;
	contactPhone: string;
}

export const mapCardType = (cardTypes: CardTypeSummary[]): CardType[] => {
	return cardTypes.map((ct) => ({
		id: `${ct.id}`,
		cardName: ct.displayName,
		cardColor: ct.color,
		cardType: ct.name,
		currency: ct.sum.currency?.symbol || ct.sum.currencySymbol,
		balance: ct.sum.value,
	}));
};

export const mapExpirations = (expirations: CardBatch[]): Expiration[] => {
	return expirations.map(
		({
			card,
			batchId,
			expiresAt,
			expiresAtExtent,
			balance,
			cardId,
			batch,
		}) => ({
			cardId: `${cardId}`,
			cardType: card.cardType?.name,
			cardName: card.cardType?.displayName,
			cardNumber: card.code,
			cardBalance: card.balance.value,
			cardColor: card.cardType?.color,
			batch: `${batchId}`,
			chassis: batch?.tpChasis,
			expiration: expiresAt,
			expiresAtExtent: expiresAtExtent,
			currency: balance.currency?.symbol || balance.currencySymbol,
			balance: balance.value,
			contactName: card?.contact?.fullName,
			contactPhone: card?.contact?.phone,
		}),
	);
};

export const mapExpirationMovements = (
	movements: BatchMovement[],
): BatchMovementRow[] => {
	return movements.map(({ movement, batchId, amount, batch }) => {
		const { charge, transfer, type } = movement || {};
		let voucherURL = '';
		let number = '';
		if (type === MovementType.Consume) {
			number = charge?.operationCode;
			voucherURL = charge?.imageUrl;
		} else if (
			type === MovementType.TransferOut ||
			type === MovementType.TransferIn
		) {
			number = transfer?.operationCode;
			voucherURL = transfer?.imageUrl;
		}
		return {
			cardNumber: movement?.card?.code,
			number,
			date: movement?.createdAt,
			currency: amount.currency?.symbol || amount.currencySymbol,
			amount: amount.value,
			dealer: charge?.cashier?.dealer?.name,
			cashier: charge?.cashier?.fullName,
			batch: `${batchId}`,
			chassis: batch?.tpChasis,
			voucherURL,
			chargeStatus: charge?.status,
			type: movement?.displayName,
		};
	});
};
