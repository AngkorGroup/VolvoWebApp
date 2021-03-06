import {
	ACTIONS_LABEL,
	AUTH_VIEWS,
	DEFAULT_DATE_FORMAT,
	MENU_ITEMS,
	TableColumn,
} from 'common/constants';
import moment, { Moment } from 'moment';
import numeral from 'numeral';
import {
	ChargeType,
	ChargeTypeKey,
	ContactType,
	ContactTypeKey,
} from './enums';
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
	Role,
} from './types';

const ALL_OPTION = { value: 'all', label: 'Todos' };
const NO_OPTION = { value: '-', label: 'Ninguno' };

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

const optionsWithout = (options: Option[]): Option[] => [NO_OPTION, ...options];

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
	return cards.map(({ id, contact, balance, cardType }: Card) => ({
		value: `${id}`,
		label: `${cardType?.name} - Cliente: ${contact?.client?.name} RUC:${contact?.client?.ruc} - Contacto: ${contact?.fullName} C:${contact?.phone} - ${balance?.label}`,
	}));
};

export const parseDealers = (
	dealers: Dealer[],
	withAll?: boolean,
	without?: boolean,
): Option[] => {
	const options = dealers.map(({ id, ruc, tpCode, name, maxCashiers }) => ({
		value: `${id}`,
		label: `${tpCode} - ${name} RUC: ${ruc} - MÁX. CAJEROS: ${maxCashiers}`,
	}));
	if (withAll) {
		return optionsWithAll(options);
	}
	if (without) {
		return optionsWithout(options);
	}
	return options;
};

export const parseCashiers = (
	cashiers: Cashier[],
	withAll?: boolean,
	without?: boolean,
): Option[] => {
	const options = cashiers.map(({ id, phone, fullName }) => ({
		value: `${id}`,
		label: `${phone} - ${fullName}`,
	}));
	if (withAll) {
		return optionsWithAll(options);
	}
	if (without) {
		return optionsWithout(options);
	}
	return options;
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

export const getKeyStatus = (status: ChargeTypeKey) => {
	const type = ChargeType[status];
	if (type) {
		return type[0] || '';
	}
	return '';
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
		label: v.displayName,
	}));
};

export const getAllMenuIds = () => {
	return MENU_ITEMS.reduce((acc, val) => {
		const menuListIds = val.menuList?.map((m) => m.id) || [];
		return [...acc, ...menuListIds];
	}, [] as string[]);
};

export const getAllowMenus = (accesses: string[]) => {
	return MENU_ITEMS.map((menu) => {
		const menuList = menu.menuList || [];
		return {
			...menu,
			menuList: menuList.filter((m) => accesses.some((id) => id === m.id)),
		};
	}).filter((menu) => menu.menuList.length > 0);
};

export const parseRoles = (roles: Role[]): Option[] => {
	return roles.map(({ id, name }) => ({
		value: `${id}`,
		label: name,
	}));
};

const isRouteExcluded = (id: string) => AUTH_VIEWS.some((k) => k === id);

export const isRouteAllow = (id: string, accesses: string[]) => {
	return accesses.some((k) => k === id.toUpperCase()) || isRouteExcluded(id);
};

export const parseSimpleClients = (
	clients: Client[],
	withAll?: boolean,
): Option[] => {
	const options = clients.map(({ id, ruc, name }) => ({
		value: `${id}`,
		label: `${ruc} - ${name}`,
	}));
	return withAll ? optionsWithAll(options) : options;
};

export const renderContactType = (type: ContactTypeKey) => ContactType[type];
