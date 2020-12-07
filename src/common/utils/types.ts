export interface Option {
	value: string;
	label: string;
}

export interface LoginResponse {
	admin: Admin;
	authToken: string;
}

export interface UserAdmin {
	id: number;
	type: string;
	admin: Admin;
	contact: Contact;
	cashier: Cashier;
	createdAt: string;
	archiveAt: string;
}

export interface Admin {
	id: number;
	userId: number;
	firstName: string;
	lastName: string;
	fullName: string;
	userName: string;
	phone: string;
	email: string;
	createdAt: string;
	status: string;
	archiveAt: string;
	dealerId: number;
	menuOptions: string[];
}

export interface Currency {
	abbreviation: string;
	id: number;
	name: string;
	status: string;
	symbol: string;
	tpCode: string;
	archiveAt: string;
}

export interface Amount {
	value: number;
	currency: Currency;
	label: string;
	currencySymbol: string;
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
	archiveAt: string;
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
	currency: Currency;
	color: string;
	term: number;
	tpCode: string;
	createdAt: string;
	createdBy: string;
	status: string;
	archiveAt: string;
}

export interface Bank {
	id: number;
	name: string;
	abbreviation: string;
	tpCode: string;
	status: string;
	archiveAt: string;
}

export interface Load {
	id: number;
	amount: Amount;
	balance: Amount;
	expiresAt: string;
	expiresAtExtent: string;
	tpContractDate: string;
	tpChasis: string;
	tpInvoiceDate: string;
	tpInvoiceCode: string;
	tpContractType: string;
	tpContractBatchNumber: string;
	clientId: number;
	client: Client;
	tpContractNumber: string;
	dealerCode: string;
	dealerName: string;
	businessCode: string;
	businessDescription: string;
	cardTypeId: number;
	cardType: CardType;
	rechargeType: CommonValue;
	businessArea: CommonValue;
	createdBy: string;
	createdAt: string;
}

export interface PreLoad {
	batch: Batch;
	card: Card;
	client: Client;
	contact: Contact;
	rowIndex: number;
	errorMessage: string;
	lineContent: string;
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
	tpCode: string;
	cardType: CardType;
	balance: Amount;
	calculatedBalance: Amount;
	contact: Contact;
	contactId: number;
	createdAt: string;
	status: string;
}

export interface CardTypeSummary {
	id: number;
	name: string;
	displayName: string;
	sum: Amount;
	color: string;
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
	rechargeType: CommonValue;
	businessArea: CommonValue;
	client: Client;
	balance: Amount;
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
	card: Card;
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
	id: number;
	name: string;
	ruc: string;
	contactName: string;
	address: string;
	phone: string;
	tpCode: string;
	type: string;
	archiveAt: string;
	createdAt: string;
	status: string;
	zone: string;
	maxCashiers: number;
}

export interface Cashier {
	id: number;
	firstName: string;
	lastName: string;
	fullName: string;
	imei: string;
	email: string;
	phone: string;
	tpCode: string;
	dealerId: number;
	dealer: Dealer;
	userId: number;
	createdAt: string;
	archiveAt: string;
	status: string;
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
	card: Card;
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

export interface CommonValue {
	id: number;
	name: string;
	status: string;
	tpCode: string;
	abbreviation: string;
	sunatCode: string;
	archiveAt: string;
}

export interface Filter {
	filterClient?: boolean;
	filterDateRange?: boolean;
	filterCardType?: boolean;
	filterDealer?: boolean;
	filterEconomicGroup?: boolean;
	filterBusinessArea?: boolean;
	filterRechargeType?: boolean;
	filterSector?: boolean;
}

export interface Liquidation {
	id: number;
	bankAccountId: number;
	chargesCount: number;
	dealer: Dealer;
	amount: Amount;
	date: string;
	status: string;
	liquidationStatus: string;
	paymentDate: string;
	voucher: string;
	dealerBankAccount: string;
	companyBankAccount: string;
	refundId: number;
}

export interface Refund {
	id: number;
	amount: Amount;
	date: string;
	refundStatus: string;
	liquidationsCount: number;
	bankAccountId: number;
	bankAccount: Account;
	companyBankAccount: string;
	paymentDate: string;
	voucher: string;
}

export interface Account {
	id: number;
	account: string;
	cci: string;
	currency: Currency;
	currencyId: number;
	isDefault: boolean;
	bankAccountTypeId: number;
	bankAccountType: CommonValue;
	bankId: number;
	bank: CommonValue;
	status: number;
	archiveAt: string;
}

export interface RechargeType {
	id: number;
	name: string;
	tpCode: string;
	archiveAt: string;
	status: string;
}

export interface Sector {
	id: number;
	name: string;
	tpCode: string;
	archiveAt: string;
	status: string;
}

export interface Menu {
	id: number;
	key: string;
	name: string;
	displayName: string;
	status: string;
	menuChildren: Menu;
}

export interface RoleMenu {
	id: number;
	menuId: number;
	roleId: number;
	menu: Menu;
}

export interface Role {
	id: number;
	name: string;
	roleMenus: RoleMenu[];
}
