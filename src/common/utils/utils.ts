import moment, { Moment } from 'moment';
import numeral from 'numeral';
import { DEFAULT_DATE_FORMAT } from '../constants/constants';
import {
	Card,
	CardType,
	Cashier,
	Client,
	Contact,
	Dealer,
	Option,
} from './types';

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

export const parseClients = (clients: Client[]): Option[] => {
	return clients.map(({ id, ruc, name, balance }) => ({
		value: `${id}`,
		label: `RUC: ${ruc} ${name} - ${balance.currency} ${formatNumber(
			balance.value,
		)}`,
	}));
};

export const parseContacts = (contacts: Contact[]): Option[] => {
	return contacts.map(({ id, fullName, phone, client }) => ({
		value: `${id}`,
		label: `${client?.name}: ${phone} - ${fullName}`,
	}));
};

export const parseCards = (cards: Card[]): Option[] => {
	return cards.map(({ id, code, contact, balance, cardType }: Card) => ({
		value: `${id}`,
		label: `${cardType?.name}:${code} - RUC:${contact?.client?.ruc} - C:${
			contact?.phone
		} - ${balance?.currency} ${formatNumber(balance?.value)}`,
	}));
};

export const parseDealers = (dealers: Dealer[]): Option[] => {
	return dealers.map(({ id, ruc, tpCode, name, maxCashiers }) => ({
		value: `${id}`,
		label: `${tpCode} - ${name} RUC: ${ruc} - MÁX. CAJEROS: ${maxCashiers}`,
	}));
};

export const parseCashiers = (cashiers: Cashier[]): Option[] => {
	const defaultOption = { value: 'all', label: 'Todas' };
	const options = cashiers.map(({ id, phone, fullName }) => ({
		value: `${id}`,
		label: `${phone} - ${fullName}`,
	}));
	return [defaultOption, ...options];
};

export const parseCardTypes = (cardTypes: CardType[]): Option[] => {
	return cardTypes.map((ct) => ({
		value: `${ct.id}`,
		label: ct.displayName,
	}));
};

const PENDING_STATUS = 'P';

export const getPendingStatus = (status: string) => {
	return status && status[0] === PENDING_STATUS ? PENDING_STATUS : '';
};
