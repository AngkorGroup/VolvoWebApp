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
import { LiquidationStatus, RefundStatus } from 'common/utils';

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
		id: 'CONFIGURATION',
		title: 'Configuración',
		icon: SettingsIcon,
		menuList: [
			{
				id: 'CARD_TYPES',
				title: 'Tipos de Tarjeta',
				path: '/configuration/card_types',
			},
			{
				id: 'RECHARGE_TYPES',
				title: 'Tipos de Recarga',
				path: '/configuration/recharge_types',
			},
			{
				id: 'BUSINESS_AREAS',
				title: 'Áreas de negocio',
				path: '/configuration/business_areas',
			},
			{
				id: 'DOCUMENT_TYPES',
				title: 'Tipos de Documento',
				path: '/configuration/document_types',
			},
			{
				id: 'SECTORS',
				title: 'Sectores de Clientes',
				path: '/configuration/sectors',
			},
			{
				id: 'CURRENCIES',
				title: 'Monedas',
				path: '/configuration/currencies',
			},
			{
				id: 'BANKS',
				title: 'Bancos',
				path: '/configuration/banks',
			},
			{
				id: 'BANK_ACCOUNT_TYPES',
				title: 'Tipos de Cuenta Bancarias',
				path: '/configuration/bank_account_types',
			},
			{
				id: 'BANK_ACCOUNTS',
				title: 'Cuentas Bancarias',
				path: '/configuration/bank_accounts',
			},
			{
				id: 'MAPPINGS',
				title: 'Mappings',
				path: '/configuration/mappings',
			},
		],
	},
	{
		id: 'CARDS',
		title: 'Tarjetas',
		icon: CreditCardIcon,
		menuList: [
			{
				id: 'CARD_BALANCE',
				title: 'Saldos Tarjeta',
				path: '/cards/card_balance',
			},
			{
				id: 'CARDS_DATA',
				title: 'Datos de Tarjetas',
				path: '/cards/cards_data',
			},
		],
	},
	{
		id: 'CLIENTS',
		title: 'Clientes',
		icon: PersonIcon,
		menuList: [
			{
				id: 'CLIENT_LIST',
				title: 'Clientes',
				path: '/clients/list',
			},
			{
				id: 'CLIENT_USERS',
				title: 'Contactos',
				path: '/clients/client_users',
			},
			{
				id: 'CLIENT_BALANCE',
				title: 'Saldos Cliente',
				path: '/clients/client_balance',
			},
		],
	},
	{
		id: 'DEALERS',
		title: 'Dealers',
		icon: StoreIcon,
		menuList: [
			{
				id: 'DEALER_LIST',
				title: 'Dealers',
				path: '/dealers/list',
			},
			{
				id: 'POS',
				title: 'POS',
				path: '/dealers/pos',
			},
			{
				id: 'CONSUMES_BY_DEALERS',
				title: 'Operaciones por Dealer',
				path: '/dealers/consumes_by_dealer',
			},
		],
	},
	{
		id: 'OPERATIONS',
		title: 'Operaciones',
		icon: ListAltIcon,
		menuList: [
			{
				id: 'LOADS',
				title: 'Carga Masiva',
				path: '/operations/loads',
			},
			{
				id: 'CONSULT_LOADS',
				title: 'Consulta de Cargas y Recargas',
				path: '/operations/consult_loads',
			},
			{
				id: 'AMPLITUDES',
				title: 'Ampliar Vencimientos',
				path: '/operations/extend_expirations',
			},
			{
				id: 'LIQUIDATIONS',
				title: 'Liquidaciones',
				path: '/operations/liquidations',
			},
			{
				id: 'REFUNDS',
				title: 'Reembolsos',
				path: '/operations/refunds',
			},
		],
	},
	{
		id: 'REPORTS',
		title: 'Reportes',
		icon: LibraryBooksIcon,
		menuList: [
			{
				id: 'CONSUMES_BY_CLIENT',
				title: 'Consumos por Cliente',
				path: `${REPORT_PATH_SOURCE}/consumes_by_client`,
			},
			{
				id: 'CHARGES_BY_DEALER',
				title: 'Cobros por Dealer y Grupo Económico',
				path: `${REPORT_PATH_SOURCE}/charges_by_dealer`,
			},
			{
				id: 'CONSUMES_RANKING',
				title: 'Ranking de Consumos',
				path: `${REPORT_PATH_SOURCE}/consumes_ranking`,
			},
			{
				id: 'CHARGES_RANKING',
				title: 'Ranking de Cobros',
				path: `${REPORT_PATH_SOURCE}/charges_ranking`,
			},
			{
				id: 'CHARGES_BY_CLIENT',
				title: 'Recargas por Cliente y Área de Negocio',
				path: `${REPORT_PATH_SOURCE}/charges_by_client`,
			},
			{
				id: 'CLIENTS_CARD_USE',
				title: 'Clientes vs uso de tarjeta',
				path: `${REPORT_PATH_SOURCE}/clients_card_use`,
			},
			{
				id: 'CLIENTS_CARD_EXPIRATION',
				title: 'Clientes con tarjetas próximas a vencer',
				path: `${REPORT_PATH_SOURCE}/clients_card_expiration`,
			},
			{
				id: 'CONSUMES_BY_BUSINESS_AREA',
				title: 'Consumos por Área de Negocio',
				path: `${REPORT_PATH_SOURCE}/consumes_by_business_area`,
			},
			{
				id: 'CONSUMES_BY_ECONOMIC',
				title: 'Consumo por Sector Económico del cliente',
				path: `${REPORT_PATH_SOURCE}/consumes_by_economic`,
			},
			{
				id: 'CLIENT_CONSUMES_BY_DEALER',
				title: 'Consumo del cliente por Dealer',
				path: `${REPORT_PATH_SOURCE}/client_consumes_by_dealer`,
			},
			{
				id: 'REPORT_REFUNDS',
				title: 'Reporte de Reembolsos',
				path: `${REPORT_PATH_SOURCE}/refunds`,
			},
			{
				id: 'PENDING_CHARGES_REFUND',
				title: 'Cobros pendientes de reembolsos',
				path: `${REPORT_PATH_SOURCE}/pending_charges_refund`,
			},
			{
				id: 'UNSIGNED_CONTACTS',
				title: 'Contactos No Logueados',
				path: `${REPORT_PATH_SOURCE}/unsigned_contacts`,
			},
		],
	},
	{
		id: 'PORTAL',
		title: 'Portal',
		icon: WorkIcon,
		menuList: [
			{
				id: 'POS_OPERATIONS',
				title: 'Mantener POS',
				path: '/portal/pos',
			},
			{
				id: 'CONSULT_OPERATIONS',
				title: 'Consultar Operaciones',
				path: '/portal/consult_operations',
			},
			{
				id: 'CONSULT_LIQUIDATIONS',
				title: 'Consultar Liquidaciones',
				path: '/portal/consult_liquidations',
			},
		],
	},
	{
		id: 'SECURITY',
		title: 'Seguridad',
		icon: VerifiedUserIcon,
		menuList: [
			{
				id: 'USERS',
				title: 'Usuarios',
				path: '/security/users',
			},
			{
				id: 'ROLES',
				title: 'Roles',
				path: '/security/roles',
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
		title: 'Recargas por Cliente y Área de Negocio',
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
			filterDateRange: true,
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
		title: 'Consumo por Área de Negocio',
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
	{
		id: 'unsigned_contacts',
		title: 'Contactos No Logueados',
		filters: {
			filterMultiClient: true,
			filterDateRange: true,
		},
	},
];

export const TEXT_MAX_LENGTH = 150;

export const NUMERIC_FIELD_MESSAGE = 'El campo debe ser numérico';

export const REFUND_STATUSES = [
	{
		value: RefundStatus.Anulado,
		label: RefundStatus.Anulado.toUpperCase(),
	},
	{
		value: RefundStatus.Programado,
		label: RefundStatus.Programado.toUpperCase(),
	},
	{
		value: RefundStatus.Pagado,
		label: RefundStatus.Pagado.toUpperCase(),
	},
];

export const LIQUIDATION_STATUSES = [
	{
		value: LiquidationStatus.Anulado,
		label: LiquidationStatus.Anulado.toUpperCase(),
	},
	{
		value: LiquidationStatus.Generado,
		label: LiquidationStatus.Generado.toUpperCase(),
	},
	{
		value: LiquidationStatus.Programado,
		label: LiquidationStatus.Programado.toUpperCase(),
	},
	{
		value: LiquidationStatus.Pagado,
		label: LiquidationStatus.Pagado.toUpperCase(),
	},
];

export const AUTH_VIEWS: string[] = ['PROFILE'];
