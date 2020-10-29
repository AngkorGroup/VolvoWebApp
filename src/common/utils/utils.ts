import moment, { Moment } from 'moment';
import { DEFAULT_DATE_FORMAT } from '../constants/constants';
import { Client, Option } from './types';

// TODO: research about iterating over keys of generic types
export const filterRows = (query: string, rows: any[]) => {
	return rows.filter((row) => {
		const keys = Object.keys(row);
		const match = keys.some((key) => {
			if (row.hasOwnProperty(key)) {
				const value = `${row[key]}`.toLowerCase();
				return value.includes(query.toLowerCase());
			}
			return false;
		});
		return match;
	});
};

interface DateRow {
	id: string;
	date: string;
}

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
	return clients.map((c) => ({
		value: `${c.id}`,
		label: `RUC: ${c.ruc} ${c.name} - US$ 10,000.00`,
	}));
};
