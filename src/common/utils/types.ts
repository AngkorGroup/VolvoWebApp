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
}
