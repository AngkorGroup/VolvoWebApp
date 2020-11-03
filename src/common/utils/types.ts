export interface Option {
	value: string;
	label: string;
}

export interface Admin {
	id: number;
	firstName: string;
	lastName: string;
	fullName: string;
	userName: string;
	phone: string;
	email: string;
}

export interface Amount {
	value: number;
	currency: string;
	label: string;
}

export interface Contact {
	id: number;
	firstName: string;
	lastName: string;
	fullName: string;
	type: string;
	phone: string;
	email: string;
	documentType: string;
	documentNumber: string;
	status: string;
	clientId: number;
	userId: number;
	client: Client;
}

export interface Client {
	id: number;
	name: string;
	ruc: string;
	address: string;
	phone: string;
	status: string;
	createdAt: string;
	mainContact: Contact;
	balance: Amount;
}

export interface CardType {
	id: number;
	name: string;
	displayName: string;
	currency: string;
	color: string;
}

export interface Load {
	id: number;
	amount: Amount;
	expiresAt: string;
	expiresAtExtent: string;
	tpContractDate: string;
	tpChasis: string;
	tpInvoiceDate: string;
	tpInvoiceCode: string;
	tpContractType: string;
	clientId: number;
	client: Client;
	tpContractNumber: string;
	dealerCode: string;
	dealerName: string;
	businessCode: string;
	businessDescription: string;
	cardTypeId: number;
	cardType: CardType;
}

export interface LoadError {
	rowIndex: number;
	errorMessage: string;
	fileName: string;
	lineContent: string;
	createdAt: string;
}

export interface Card {
	id: number;
	code: string;
	cardType: CardType;
	balance: Amount;
	calculatedBalance: Amount;
	contact: Contact;
	contactId: number;
	createdAt: string;
}

export interface CardTypeSummary {
	id: number;
	name: string;
	displayName: string;
	sum: Amount;
}

export interface Batch {
	id: number;
	amount: Amount;
	expiresAt: string;
	expiresAtExtent: string;
	tpContractDate: string;
	tpChasis: string;
	tpInvoiceDate: string;
	tpInvoiceCode: string;
	tpContractType: string;
	clientId: number;
	tpContractNumber: string;
	tpContractBatchNumber: string;
	dealerCode: string;
	dealerName: string;
	businessCode: string;
	businessDescription: string;
	cardTypeId: number;
	lineContent: string;
	createdAt: string;
}

export interface CardBatch {
	id: number;
	balance: Amount;
	batchId: number;
	batch: Batch;
	cardId: number;
	card: Card;
	expiresAt: string;
	expiresAtExtent: string;
	createdAt: string;
}

export interface Movement {
	id: number;
	amount: Amount;
	type: string;
	displayName: string;
	description: string;
	createdAt: string;
	charge: Charge;
	transfer: Transfer;
}

export interface Transfer {
	id: number;
	operationCode: string;
	amount: Amount;
	displayName: string;
	imageUrl: string;
	originCardId: number;
	destinyCardId: number;
	createdAt: string;
}

export interface Dealer {
	name: string;
	ruc: string;
	contactName: string;
	address: string;
	phone: string;
	tpCode: string;
	archiveAt: string;
	createdAt: string;
}

export interface Cashier {
	id: number;
	firstName: string;
	lastName: string;
	fullName: string;
	email: string;
	phone: string;
	tpCode: string;
	dealerId: number;
	dealer: Dealer;
	userId: number;
	createdAt: string;
}

export interface Charge {
	id: number;
	operationCode: string;
	amount: Amount;
	displayName: string;
	imageUrl: string;
	status: string;
	chargeType: string;
	cardId: number;
	cashierId: number;
	cashier: Cashier;
	createdAt: string;
	description: string;
}

export interface BatchMovement {
	amount: Amount;
	batchId: number;
	batch: Batch;
	movementId: number;
	movement: Movement;
}
