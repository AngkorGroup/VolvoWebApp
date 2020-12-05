import { ACTIONS_LABEL, TableColumn } from 'common/constants';
import moment, { Moment } from 'moment';
import numeral from 'numeral';
import { DEFAULT_DATE_FORMAT } from '../constants/constants';
import {
	Account,
	Card,
	CardType,
	Cashier,
	Client,
	CommonValue,
	Contact,
	Dealer,
	Menu,
	Option,
} from './types';

const ALL_OPTION = { value: 'all', label: 'Todos' };

// TODO: research about iterating over keys of generic types
export const filterRows = (query: string, rows: any[] | null) => {
	return (
		rows?.filter((row) => {
			const keys = Object.keys(row);
			const match = keys.some((key) => {
				if (row.hasOwnProperty(key)) {
					const value = `${row[key]}`.toLowerCase();
					return value.includes(query.toLowerCase());
				}
				return false;
			});
			return match;
		}) || []
	);
};

interface DateRow {
	id: string;
	date: string;
}

export const formatNumber = (value: number) => numeral(value).format('0,0.00');

export const filterDateRangeRows = (
	start: Moment | null,
	end: Moment | null,
	rows: DateRow[],
) => {
	return rows.filter((row) => {
		const date = moment(row.date, DEFAULT_DATE_FORMAT);
		const isDateOnRange = date.isBetween(start, end, undefined, '[]');
		return isDateOnRange;
	});
};

const optionsWithAll = (options: Option[]): Option[] => [
	ALL_OPTION,
	...options,
];

export const parseClients = (
	clients: Client[],
	withAll?: boolean,
): Option[] => {
	const options = clients.map(({ id, ruc, name, balance }) => ({
		value: `${id}`,
		label: `RUC: ${ruc} ${name} - ${balance.label}`,
	}));
	return withAll ? optionsWithAll(options) : options;
};

const renderContactLabel = (client: string, phone: string, fullName: string) =>
	client ? `${client}: ${phone} - ${fullName}` : `${phone} - ${fullName}`;

export const parseContacts = (contacts: Contact[]): Option[] => {
	return contacts.map(({ id, fullName, phone, client }) => ({
		value: `${id}`,
		label: renderContactLabel(client?.name, phone, fullName),
	}));
};

export const parseCards = (cards: Card[]): Option[] => {
	return cards.map(({ id, code, contact, balance, cardType }: Card) => ({
		value: `${id}`,
		label: `${cardType?.name}:${code} - RUC:${contact?.client?.ruc} - C:${contact?.phone} - ${balance?.label}`,
	}));
};

export const parseDealers = (
	dealers: Dealer[],
	withAll?: boolean,
): Option[] => {
	const options = dealers.map(({ id, ruc, tpCode, name, maxCashiers }) => ({
		value: `${id}`,
		label: `${tpCode} - ${name} RUC: ${ruc} - MÁX. CAJEROS: ${maxCashiers}`,
	}));
	return withAll ? optionsWithAll(options) : options;
};

export const parseCashiers = (cashiers: Cashier[]): Option[] => {
	const defaultOption = { value: 'all', label: 'Todas' };
	const options = cashiers.map(({ id, phone, fullName }) => ({
		value: `${id}`,
		label: `${phone} - ${fullName}`,
	}));
	return [defaultOption, ...options];
};

export const parseCardTypes = (
	cardTypes: CardType[],
	withAll?: boolean,
): Option[] => {
	const options = cardTypes.map((ct) => ({
		value: `${ct.id}`,
		label: ct.displayName,
	}));
	return withAll ? optionsWithAll(options) : options;
};

export const parseListValues = (
	values: CommonValue[],
	withAll?: boolean,
): Option[] => {
	const options = values.map((v) => ({
		value: `${v.id}`,
		label: `${v.abbreviation} - ${v.name}`,
	}));
	return withAll ? optionsWithAll(options) : options;
};

export const parseCommonValue = (
	values: CommonValue[],
	withAll?: boolean,
): Option[] => {
	const options = values.map((v) => ({
		value: `${v.id}`,
		label: v.name,
	}));
	return withAll ? optionsWithAll(options) : options;
};

const PENDING_STATUS = 'PENDING';
const REJECTED_STATUS = 'REJECTED';
const CANCELED_STATUS = 'CANCELED';

export const getKeyStatus = (status: string) => {
	const lowered = status ? status.toUpperCase() : '';
	switch (lowered) {
		case PENDING_STATUS:
			return PENDING_STATUS[0];
		case REJECTED_STATUS:
		case CANCELED_STATUS:
			return REJECTED_STATUS[0];
		default:
			return '';
	}
};

export const getFilename = (id: string, ext: string, content: any) => {
	if (content) {
		return content
			.split(';')
			.find((n: any) => n.includes('filename='))
			.replace('filename=', '')
			.trim();
	}
	return `${id}.${ext}`;
};

export const parseBankAccounts = (accounts: Account[]) => {
	return accounts.map((a) => ({
		value: `${a.id}`,
		label: `${a.bankAccountType?.name} ${a.currency?.symbol} ${a.account}`,
	}));
};

export const parseExportColumns = (cols: any[]): TableColumn[] => {
	return cols
		.filter((col) => col.Header !== ACTIONS_LABEL)
		.map((col) => ({
			title: col.Header,
			value: col.accessor,
		}));
};

export const parseMenuList = (values: Menu[]): Option[] => {
	return values.map((v) => ({
		value: `${v.id}`,
		label: v.name,
	}));
};
