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

type MaterialIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;

export interface MenuItem {
	id: string;
	title: string;
	path: string;
	icon: MaterialIcon;
}

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';

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
