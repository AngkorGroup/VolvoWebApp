import { formatNumber } from 'common/utils';
import {
	COLUMN_CENTER,
	COLUMN_RIGHT,
} from '../../common/constants/tableColumn';
import { renderAmount } from './ClientBalance';

export const CARD_COLUMNS = [
	{
		Header: 'Tipo de Tarjeta',
		accessor: 'cardType',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
	},
	{
		Header: 'Saldo',
		accessor: 'balance',
		Cell: (cell: any) => formatNumber(cell.value),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
];

export const EXPIRATION_COLUMNS = [
	{
		Header: 'Tipo de Tarjeta',
		accessor: 'cardType',
	},
	{
		Header: 'Número deTarjeta',
		accessor: 'cardNumber',
	},
	{
		Header: 'Contacto',
		accessor: 'contactName',
	},
	{
		Header: 'Teléfono',
		accessor: 'contactPhone',
	},
	{
		Header: 'Lote',
		accessor: 'batch',
	},
	{
		Header: 'Vencimiento',
		accessor: 'expiration',
	},
	{
		Header: 'Venc. Ext.',
		accessor: 'expiresAtExtent',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
	},
	{
		Header: 'Saldo',
		accessor: 'balance',
		Cell: (cell: any) => formatNumber(cell.value),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
];

export const CARD_LIST_COLUMNS = [
	{
		Header: 'Número',
		accessor: 'number',
	},
	{
		Header: 'Contacto',
		accessor: 'contact',
	},
	{
		Header: 'Teléfono',
		accessor: 'phone',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
	},
	{
		Header: 'Saldo',
		accessor: 'balance',
		Cell: (cell: any) => formatNumber(cell.value),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
];

export const CARD_BATCH_COLUMNS = [
	{
		Header: 'Número',
		accessor: 'number',
	},
	{
		Header: 'Lote',
		accessor: 'batch',
	},
	{
		Header: 'Vencimiento',
		accessor: 'expiration',
	},
	{
		Header: 'Venc. Ext.',
		accessor: 'expiresAtExtent',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
	},
	{
		Header: 'Saldo',
		accessor: 'balance',
		Cell: (cell: any) => formatNumber(cell.value),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
];

export const BATCH_MOVEMENTS_COLUMNS = [
	{
		Header: 'Tipo',
		accessor: 'type',
	},
	{
		Header: '#Operación',
		accessor: 'number',
	},
	{
		Header: 'Fecha Op.',
		accessor: 'date',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
	},
	{
		Header: 'Monto',
		accessor: 'amount',
		Cell: (cell: any) => renderAmount(cell?.row?.original),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
	{
		Header: 'Dealer',
		accessor: 'dealer',
	},
	{
		Header: 'Caja',
		accessor: 'cashier',
	},
	{
		Header: 'Lote',
		accessor: 'batch',
	},
];
