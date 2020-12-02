import { ACTIONS_COLUMN } from '../../common/constants/tableColumn';

export const DEALER_COLUMNS = [
	{ title: 'Id' },
	{ title: '#TopPerú' },
	{ title: 'Nombre' },
	{ title: 'RUC' },
	{ title: 'Dirección' },
	{ title: 'Estado' },
	{ title: 'Tipo' },
	{ title: 'Teléfono' },
	{ title: 'Max. POS' },
	{ title: 'Zona' },
	{ title: 'Fecha Baja' },
	ACTIONS_COLUMN,
];

export const ACCOUNT_COLUMNS = [
	{ title: 'Id' },
	{ title: 'Cuenta Bancaria' },
	{ title: 'CCI' },
	{ title: 'Moneda' },
	{ title: 'Por defecto' },
	{ title: 'Tipo de Cuenta' },
	{ title: 'Banco' },
	{ title: 'Fecha Baja' },
	ACTIONS_COLUMN,
];
