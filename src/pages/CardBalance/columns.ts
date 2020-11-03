import {
	ACTIONS_COLUMN,
	COLUMN_CENTER,
} from '../../common/constants/tableColumn';

export const MOVEMENT_COLUMNS = [
	{ title: 'Tipo' },
	{ title: '# Op.' },
	{ title: 'Fecha Op.' },
	{ title: 'Motivo' },
	{ title: 'Monto', props: { align: COLUMN_CENTER } },
	{ title: 'Dealer' },
	{ title: 'Caja' },
	{ title: 'Lote' },
	{ title: 'Origen/Destino', props: { align: COLUMN_CENTER } },
	ACTIONS_COLUMN,
];

export const EXPIRATION_COLUMNS = [
	{ title: 'Tipo' },
	{ title: 'Número Tarjeta' },
	{ title: 'Lote' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
	{ title: 'Vencimiento' },
	//ACTIONS_COLUMN,
];

export const BATCH_COLUMNS = [
	{ title: 'Número de Tarjeta' },
	{ title: 'Lote' },
	{ title: 'Vencimiento' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
];
