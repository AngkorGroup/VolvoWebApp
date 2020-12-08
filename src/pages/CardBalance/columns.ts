import {
	ACTIONS_COLUMN,
	COLUMN_CENTER,
} from '../../common/constants/tableColumn';

export const MOVEMENT_COLUMNS = [
	{ title: 'Tipo', value: 'type' },
	{ title: '# Op.', value: 'operationNumber' },
	{ title: 'Fecha Op.', value: 'operationDate' },
	{ title: 'Motivo', value: 'reason' },
	{ title: '# Recarga', props: { align: COLUMN_CENTER }, value: 'id' },
	{ title: 'Monto', props: { align: COLUMN_CENTER }, value: 'amount' },
	{ title: 'Dealer', value: 'dealerName' },
	{ title: 'Caja', value: 'cashier' },
	{ title: 'Origen/Destino', props: { align: COLUMN_CENTER }, value: 'source' },
	ACTIONS_COLUMN,
];

export const EXPIRATION_COLUMNS = [
	{ title: 'Tipo', value: 'type' },
	{ title: 'Número Tarjeta', value: 'number' },
	{ title: 'Lote', value: 'batch' },
	{ title: 'Moneda', value: 'currency' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER }, value: 'balance' },
	{ title: 'Vencimiento', value: 'expirationDate' },
	//ACTIONS_COLUMN,
];

export const BATCH_COLUMNS = [
	{ title: 'Número de Tarjeta' },
	{ title: 'Lote' },
	{ title: 'Vencimiento' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
];
