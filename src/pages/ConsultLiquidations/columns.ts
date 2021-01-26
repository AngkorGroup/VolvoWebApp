import { ACTIONS_COLUMN, COLUMN_CENTER, COLUMN_RIGHT } from 'common/constants';
import { formatNumber } from 'common/utils';

export const LIQUIDATIONS_COLUMNS = [
	{
		title: '#Liquidación',
		accessor: 'settlement',
	},
	{
		title: 'Dealer',
		accessor: 'dealer',
	},
	{
		title: 'Moneda',
		accessor: 'currency',
	},
	{
		title: 'Monto',
		accessor: 'amount',
		Cell: (cell: any) => formatNumber(cell.value),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
	{
		title: 'Fecha',
		accessor: 'date',
	},
	{
		title: '#Consumos',
		accessor: 'chargesCount',
	},
	{
		title: 'Origen',
		accessor: 'source',
	},
	{
		title: 'Destino',
		accessor: 'target',
	},
	{
		title: 'Fecha Pago',
		accessor: 'paymentDate',
	},
	{
		title: 'Voucher',
		accessor: 'voucher',
	},
	{
		title: 'Estado',
		accessor: 'liquidationStatus',
	},
];

export const CHARGES_COLUMNS = [
	{
		title: '#Voucher',
	},
	{
		title: 'Tipo',
	},
	{
		title: '#Tarjeta',
	},
	{
		title: 'Cajero',
	},
	{
		title: 'Cliente',
	},
	{
		title: 'Fecha Op.',
	},
	{
		title: 'Cobro',
	},
	{
		title: 'Estado',
	},
	{
		title: 'Contacto',
	},
	{
		title: 'Moneda',
	},
	{
		title: 'Monto',
		props: { align: COLUMN_CENTER },
	},
	ACTIONS_COLUMN,
];
