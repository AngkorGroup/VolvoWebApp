import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import PersonIcon from '@material-ui/icons/Person';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StoreIcon from '@material-ui/icons/Store';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import moment from 'moment';

type MaterialIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;

export interface MenuItem {
	id: string;
	title: string;
	path?: string;
	icon?: MaterialIcon;
	menuList?: MenuItem[];
}

export const DEFAULT_MONTH_START_DATE = moment().subtract(1, 'months');
export const DEFAULT_WEEK_START_DATE = moment().subtract(1, 'week');

export const DEFAULT_NOW_DATE = moment();

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';
export const DEFAULT_MOMENT_FORMAT = 'DD/MM/yyyy';

export const REPORT_PATH_SOURCE = '/reports';

export const MENU_ITEMS: MenuItem[] = [
	{
		id: 'ClientBalance',
		title: 'Saldos Cliente',
		path: '/client_balance',
		icon: LocalAtmIcon,
	},
	{
		id: 'CardBalance',
		title: 'Saldos Tarjeta',
		path: '/card_balance',
		icon: LocalAtmIcon,
	},
	{
		id: 'Loads',
		title: 'Cargas y Recargas',
		path: '/loads',
		icon: PlaylistAddIcon,
	},
	{
		id: 'Clients',
		title: 'Clientes',
		path: '/clients',
		icon: PersonIcon,
	},
	{
		id: 'ClientUsers',
		title: 'Contactos por Cliente',
		path: '/client_users',
		icon: PeopleAltIcon,
	},
	{
		id: 'CardsData',
		title: 'Datos de Tarjetas',
		path: '/cards_data',
		icon: CreditCardIcon,
	},
	{
		id: 'Dealers',
		title: 'Dealers',
		path: '/dealers',
		icon: StoreIcon,
	},
	{
		id: 'CardTypes',
		title: 'Tipos de Tarjeta',
		path: '/card_types',
		icon: CardMembershipIcon,
	},
	{
		id: 'POS',
		title: 'POS',
		path: '/pos',
		icon: AddToHomeScreenIcon,
	},
	{
		id: 'ConsumesByDealer',
		title: 'Operaciones por Dealer',
		path: '/consumes_by_dealer',
		icon: ListAltIcon,
	},
	{
		id: 'Users',
		title: 'Usuarios',
		path: '/users',
		icon: AccountCircleIcon,
	},
	{
		id: 'Refunds',
		title: 'Pago de Reembolsos',
		path: '/refunds',
		icon: MonetizationOnIcon,
	},
	{
		id: 'Reports',
		title: 'Reportes',
		path: '/reports',
		icon: LibraryBooksIcon,
	},
];

export const REPORT_OPTIONS = [
	{
		id: 'ConsumesByClient',
		title: 'Consumos por Cliente',
		filters: {
			filterClient: true,
			filterDateRange: true,
			filterCardType: true,
		},
	},
	{
		id: 'ChargesByDealer',
		title: 'Cobros por Dealer y Grupo Económico',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterDealer: true,
		},
	},
	{
		id: 'ConsumesRanking',
		title: 'Ranking de Consumos',
		filters: {
			filterDateRange: true,
			filterCardType: true,
		},
	},
	{
		id: 'ChargesRanking',
		title: 'Ranking de Cobros',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterEconomicGroup: true,
		},
	},
	{
		id: 'ChargesByClient',
		title: 'Recargas por Cliente y Area de Negocio',
		filters: {
			filterClient: true,
			filterDateRange: true,
			filterCardType: true,
			filterBusinessArea: true,
			filterRechargeType: true,
		},
	},
	{
		id: 'ClientsCardUse',
		title: 'Clientes VS Uso de tarjeta',
		filters: {
			filterClient: true,
			filterCardType: true,
		},
	},
	{
		id: 'ClientsCardExpiration',
		title: 'Clientes con tarjetas próximas a vencer',
		filters: {
			filterCardType: true,
			filterClient: true,
		},
	},
	{
		id: 'ConsumesByBusinessArea',
		title: 'Consumo por Area de Negocio',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterBusinessArea: true,
		},
	},
	{
		id: 'ConsumesByEconomic',
		title: 'Consumo por Sector Económico del cliente',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterSector: true,
		},
	},
	{
		id: 'ClientConsumesByDealer',
		title: 'Consumo del Cliente por Dealer',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterClient: true,
		},
	},
	{
		id: 'Refunds',
		title: 'Reporte de Reembolsos',
		filters: {
			filterDateRange: true,
			filterDealer: true,
			filterBank: true,
		},
	},
	{
		id: 'PendingChargesRefund',
		title: 'Cobros pendientes de reembolso',
		filters: {
			filterDateRange: true,
			filterDealer: true,
		},
	},
];

export const CONSUME_TYPE = 'CON';
export const S_TRANSFER_TYPE = 'STR';
export const I_TRANSFER_TYPE = 'ITR';

export const ADMIN_TYPE = 'WebAdmin';
export const CASHIER_TYPE = 'Cashier';
export const CONTACT_TYPE = 'Contact';

export const USER_TYPES = [
	{
		value: ADMIN_TYPE,
		label: ADMIN_TYPE,
	},
	{
		value: CASHIER_TYPE,
		label: CASHIER_TYPE,
	},
	{
		value: CONTACT_TYPE,
		label: CONTACT_TYPE,
	},
];

export const TEXT_MAX_LENGTH = 150;

export const NUMERIC_FIELD_MESSAGE = 'El campo debe ser numérico';

export const REFUND_GENERATED = 'Generated';
export const REFUND_SCHEDULED = 'Scheduled';
export const REFUND_PAID = 'Paid';

export const REFUND_STATUSES = [
	{
		value: REFUND_GENERATED,
		label: 'GENERADO',
	},
	{
		value: 'Canceled',
		label: 'ANULADO',
	},
	{
		value: REFUND_SCHEDULED,
		label: 'PROGRAMADO',
	},
	{
		value: REFUND_PAID,
		label: 'PAGADO',
	},
];
