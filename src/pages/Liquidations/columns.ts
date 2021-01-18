import { ACTIONS_COLUMN, COLUMN_CENTER, COLUMN_RIGHT } from 'common/constants';
import { formatNumber } from 'common/utils';

export const LIQUIDATIONS_COLUMNS = [
	{
		Header: '#Liquidación',
		accessor: 'settlement',
	},
	{
		Header: 'Dealer',
		accessor: 'dealer',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
	},
	{
		Header: 'Monto',
		accessor: 'amount',
		Cell: (cell: any) => formatNumber(cell.value),
		propsHeader: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
	{
		Header: 'Fecha',
		accessor: 'date',
	},
	{
		Header: '#Consumos',
		accessor: 'chargesCount',
	},
	{
		Header: 'Origen',
		accessor: 'source',
	},
	{
		Header: 'Destino',
		accessor: 'target',
	},
	{
		Header: 'Fecha Pago',
		accessor: 'paymentDate',
	},
	{
		Header: 'Voucher',
		accessor: 'voucher',
	},
	{
		Header: '#Reembolso',
		accessor: 'refundId',
	},
	{
		Header: 'Estado',
		accessor: 'liquidationStatus',
	},
];

export const CHARGES_COLUMNS = [
	{ title: '#Voucher' },
	{ title: 'Tipo' },
	{ title: '#Tarjeta' },
	{ title: 'Cajero' },
	{ title: 'Cliente' },
	{ title: 'Fecha Op.' },
	{ title: 'Cobro' },
	{ title: 'Estado' },
	{ title: 'Contacto' },
	{ title: 'Moneda' },
	{ title: 'Monto', props: { align: COLUMN_CENTER } },
	ACTIONS_COLUMN,
];
