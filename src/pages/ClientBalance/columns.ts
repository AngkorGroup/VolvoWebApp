import {
	ACTIONS_COLUMN,
	COLUMN_CENTER,
} from '../../common/constants/tableColumn';

export const CARD_COLUMNS = [
	{ title: 'Tipo de Tarjeta' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
	ACTIONS_COLUMN,
];

export const EXPIRATION_COLUMNS = [
	{ title: 'Tipo de Tarjeta' },
	{ title: 'Número de Tarjeta' },
	{ title: 'Contacto' },
	{ title: 'Teléfono' },
	{ title: 'Lote' },
	{ title: 'Vencimiento' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
	ACTIONS_COLUMN,
];

export const CARD_LIST_COLUMNS = [
	{ title: 'Número' },
	{ title: 'Contacto' },
	{ title: 'Teléfono' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
	ACTIONS_COLUMN,
];

export const CARD_BATCH_COLUMNS = [
	{ title: 'Número' },
	{ title: 'Lote' },
	{ title: 'Vencimiento' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
	ACTIONS_COLUMN,
];

export const BATCH_MOVEMENTS_COLUMNS = [
	{ title: 'Tipo' },
	{ title: '#Operación' },
	{ title: 'Fecha Op.' },
	{ title: 'Moneda' },
	{ title: 'Monto', props: { align: COLUMN_CENTER } },
	{ title: 'Dealer' },
	{ title: 'Caja' },
	{ title: 'Lote' },
	ACTIONS_COLUMN,
];
