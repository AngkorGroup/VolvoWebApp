import { ACTIONS_COLUMN, COLUMN_CENTER } from 'common/constants';
import { formatNumber } from 'common/utils';
import { renderMovementAmount } from './CardBalance';

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

export const NEW_MOVEMENT_COLUMNS = [
	{
		Header: 'Tipo',
		accessor: 'type',
	},
	{
		Header: '# Op.',
		accessor: 'operationNumber',
	},
	{
		Header: 'Fecha Op.',
		accessor: 'operationDate',
	},
	{
		Header: 'Motivo',
		accessor: 'reason',
	},
	{
		Header: '# Recarga',
		accessor: 'id',
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_CENTER },
	},
	{
		Header: 'Monto',
		accessor: 'amount',
		Cell: (cell: any) => renderMovementAmount(cell?.row?.original),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_CENTER },
	},
	{
		Header: 'Dealer',
		accessor: 'dealerName',
	},
	{
		Header: 'Caja',
		accessor: 'cashier',
	},
	{
		Header: 'Origen/Destino',
		accessor: 'source',
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_CENTER },
	},
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

export const NEW_EXPIRATION_COLUMNS = [
	{
		Header: 'Tipo',
		accessor: 'type',
	},
	{
		Header: 'Número Tarjeta',
		accessor: 'number',
	},
	{
		Header: 'Lote',
		accessor: 'batch',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
	},
	{
		Header: 'Saldo',
		accessor: 'balance',
		Cell: (cell: any) => formatNumber(cell.value),
		props: { align: COLUMN_CENTER },
	},
	{
		Header: 'Vencimiento',
		accessor: 'expirationDate',
	},
	{
		Header: 'Venc. Ext.',
		accessor: 'expiresAtExtent',
	},
];

export const BATCH_COLUMNS = [
	{ title: 'Número de Tarjeta' },
	{ title: 'Lote' },
	{ title: 'Vencimiento' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
];
