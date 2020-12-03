import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SettingsIcon from '@material-ui/icons/Settings';
import WorkIcon from '@material-ui/icons/Work';
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
		id: 'Configuration',
		title: 'Configuración',
		icon: SettingsIcon,
		menuList: [
			{
				id: 'CardTypes',
				title: 'Tipos de Tarjeta',
				path: '/configuration/card_types',
			},
			{
				id: 'DocumentTypes',
				title: 'Tipos de Documento',
				path: '/configuration/document_types',
			},
			{
				id: 'Currencies',
				title: 'Monedas',
				path: '/configuration/currencies',
			},
			{
				id: 'Banks',
				title: 'Bancos',
				path: '/configuration/banks',
			},
			{
				id: 'RechargeTypes',
				title: 'Tipos de Recarga',
				path: '/configuration/recharge_types',
			},
		],
	},
	{
		id: 'Cards',
		title: 'Tarjetas',
		icon: CreditCardIcon,
		menuList: [
			{
				id: 'CardBalance',
				title: 'Saldos Tarjeta',
				path: '/cards/card_balance',
			},
			{
				id: 'CardsData',
				title: 'Datos de Tarjetas',
				path: '/cards/cards_data',
			},
		],
	},
	{
		id: 'Clients',
		title: 'Clientes',
		icon: PersonIcon,
		menuList: [
			{
				id: 'Clients',
				title: 'Clientes',
				path: '/clients/list',
			},
			{
				id: 'ClientUsers',
				title: 'Contactos',
				path: '/clients/client_users',
			},
			{
				id: 'ClientBalance',
				title: 'Saldos Cliente',
				path: '/clients/client_balance',
			},
		],
	},
	{
		id: 'Dealers',
		title: 'Dealers',
		icon: StoreIcon,
		menuList: [
			{
				id: 'Dealers',
				title: 'Dealers',
				path: '/dealers/list',
			},
			{
				id: 'POS',
				title: 'POS',
				path: '/dealers/pos',
			},
			{
				id: 'ConsumesByDealer',
				title: 'Operaciones por Dealer',
				path: '/dealers/consumes_by_dealer',
			},
		],
	},
	{
		id: 'Operations',
		title: 'Operaciones',
		icon: ListAltIcon,
		menuList: [
			{
				id: 'Loads',
				title: 'Carga Masiva',
				path: '/operations/loads',
			},
			{
				id: 'ConsultLoads',
				title: 'Consulta de Cargas y Recargas',
				path: '/operations/consult_loads',
			},
			{
				id: 'Amplitudes',
				title: 'Ampliar Vencimientos',
				path: '/operations/extend_expirations',
			},
			{
				id: 'Liquidations',
				title: 'Liquidaciones',
				path: '/operations/liquidations',
			},
			{
				id: 'Refunds',
				title: 'Reembolsos',
				path: '/operations/refunds',
			},
		],
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
				title: 'Clientes vs uso de tarjeta',
				path: `${REPORT_PATH_SOURCE}/clients_card_use`,
			},
			{
				id: 'ClientsCardExpiration',
				title: 'Clientes con tarjetas próximas a vencer',
				path: `${REPORT_PATH_SOURCE}/clients_card_expiration`,
			},
			{
				id: 'ConsumesByBusinessArea',
				title: 'Consumos por Area de Negocio',
				path: `${REPORT_PATH_SOURCE}/consumes_by_business_area`,
			},
			{
				id: 'ConsumesByEconomic',
				title: 'Consumo por Sector Económico del cliente',
				path: `${REPORT_PATH_SOURCE}/consumes_by_economic`,
			},
			{
				id: 'ClientConsumesByDealer',
				title: 'Consumo del cliente por Dealer',
				path: `${REPORT_PATH_SOURCE}/client_consumes_by_dealer`,
			},
			{
				id: 'Refunds',
				title: 'Reporte de Reembolsos',
				path: `${REPORT_PATH_SOURCE}/refunds`,
			},
			{
				id: 'PendingChargesRefund',
				title: 'Cobros pendientes de reembolsos',
				path: `${REPORT_PATH_SOURCE}/pending_charges_refund`,
			},
		],
	},
	{
		id: 'Portal',
		title: 'Portal',
		icon: WorkIcon,
		menuList: [
			{
				id: 'POSOperations',
				title: 'Mantener POS',
				path: '/portal/pos',
			},
			{
				id: 'ConsultOperations',
				title: 'Consultar Operaciones',
				path: '/portal/consult_operations',
			},
			{
				id: 'ConsultLiquidations',
				title: 'Consultar Liquidaciones',
				path: '/portal/consult_liquidations',
			},
		],
	},
	{
		id: 'Security',
		title: 'Seguridad',
		icon: VerifiedUserIcon,
		menuList: [
			{
				id: 'Users',
				title: 'Usuarios',
				path: '/security/users',
			},
		],
	},
];

export const REPORT_OPTIONS = [
	{
		id: 'consumes_by_client',
		title: 'Consumos por Cliente',
		filters: {
			filterClient: true,
			filterDateRange: true,
			filterCardType: true,
		},
	},
	{
		id: 'charges_by_dealer',
		title: 'Cobros por Dealer y Grupo Económico',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterDealer: true,
		},
	},
	{
		id: 'consumes_ranking',
		title: 'Ranking de Consumos',
		filters: {
			filterDateRange: true,
			filterCardType: true,
		},
	},
	{
		id: 'charges_ranking',
		title: 'Ranking de Cobros',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterEconomicGroup: true,
		},
	},
	{
		id: 'charges_by_client',
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
		id: 'clients_card_use',
		title: 'Clientes VS Uso de tarjeta',
		filters: {
			filterClient: true,
			filterCardType: true,
		},
	},
	{
		id: 'clients_card_expiration',
		title: 'Clientes con tarjetas próximas a vencer',
		filters: {
			filterCardType: true,
			filterClient: true,
		},
	},
	{
		id: 'consumes_by_business_area',
		title: 'Consumo por Area de Negocio',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterBusinessArea: true,
		},
	},
	{
		id: 'consumes_by_economic',
		title: 'Consumo por Sector Económico del cliente',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterSector: true,
		},
	},
	{
		id: 'client_consumes_by_dealer',
		title: 'Consumo del Cliente por Dealer',
		filters: {
			filterDateRange: true,
			filterCardType: true,
			filterClient: true,
		},
	},
	{
		id: 'refunds',
		title: 'Reporte de Reembolsos',
		filters: {
			filterDateRange: true,
			filterDealer: true,
			filterBank: true,
		},
	},
	{
		id: 'pending_charges_refund',
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

export const OPERATION_CANCELED = 'Canceled';
export const OPERATION_GENERATED = 'Generated';
export const OPERATION_SCHEDULED = 'Scheduled';
export const OPERATION_PAID = 'Paid';

export const REFUND_STATUSES = [
	{
		value: OPERATION_CANCELED,
		label: 'ANULADO',
	},
	{
		value: OPERATION_SCHEDULED,
		label: 'PROGRAMADO',
	},
	{
		value: OPERATION_PAID,
		label: 'PAGADO',
	},
];

export const LIQUIDATION_STATUSES = [
	{
		value: OPERATION_CANCELED,
		label: 'ANULADO',
	},
	{
		value: OPERATION_GENERATED,
		label: 'GENERADO',
	},
	{
		value: OPERATION_SCHEDULED,
		label: 'PROGRAMADO',
	},
	{
		value: OPERATION_PAID,
		label: 'PAGADO',
	},
];
