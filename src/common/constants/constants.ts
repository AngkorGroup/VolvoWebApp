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

type MaterialIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;

export interface MenuItem {
	id: string;
	title: string;
	path?: string;
	icon?: MaterialIcon;
	menuList?: MenuItem[];
}

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';

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
		id: 'Reports',
		title: 'Reportes',
		icon: LibraryBooksIcon,
		menuList: [
			{
				id: 'ConsumesByClient',
				title: 'Consumos por Cliente',
				path: `${REPORT_PATH_SOURCE}/consumes_by_client`,
			},
			{
				id: 'ChargesByDealer',
				title: 'Cobros por Dealer y Grupo Económico',
				path: `${REPORT_PATH_SOURCE}/charges_by_dealer`,
			},
			{
				id: 'ConsumesRanking',
				title: 'Ranking de Consumos',
				path: `${REPORT_PATH_SOURCE}/consumes_ranking`,
			},
			{
				id: 'ChargesRanking',
				title: 'Ranking de Cobros',
				path: `${REPORT_PATH_SOURCE}/charges_ranking`,
			},
			{
				id: 'ChargesByClient',
				title: 'Recargas por Cliente y Area de Negocio',
				path: `${REPORT_PATH_SOURCE}/charges_by_client`,
			},
			{
				id: 'ClientsCardUse',
				title: 'Clientes VS Uso de tarjeta',
				path: `${REPORT_PATH_SOURCE}/clients_card_use`,
			},
			{
				id: 'ClientsCardExpiration',
				title: 'Clientes con tarjetas próximas a vencer',
				path: `${REPORT_PATH_SOURCE}/clients_card_expiration`,
			},
			{
				id: 'ConsumesByBusinessArea',
				title: 'Consumo por Area de Negocio',
				path: `${REPORT_PATH_SOURCE}/consumes_by_business_area`,
			},
			{
				id: 'ConsumesByEconomic',
				title: 'Consumo por Sector Económico del cliente',
				path: `${REPORT_PATH_SOURCE}/consumes_by_economic`,
			},
			{
				id: 'ClientConsumesByDealer',
				title: 'Consumo del Cliente por Dealer',
				path: `${REPORT_PATH_SOURCE}/client_consumes_by_dealer`,
			},
			{
				id: 'Refunds',
				title: 'Reporte de Reembolsos',
				path: `${REPORT_PATH_SOURCE}/refunds`,
			},
			{
				id: 'PendingChargesRefund',
				title: 'Cobros pendientes de reembolso',
				path: `${REPORT_PATH_SOURCE}/pending_charges_refund`,
			},
		],
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
