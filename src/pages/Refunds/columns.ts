import { COLUMN_CENTER, COLUMN_RIGHT } from 'common/constants';
import { formatNumber } from 'common/utils';

export const LIQUIDATIONS_COLUMNS = [
	{
		Header: '#Liquidación',
		accessor: 'id',
	},
	{
		Header: 'Dealer',
		accessor: 'dealer',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_CENTER },
	},
	{
		Header: 'Monto',
		accessor: 'amount',
		Cell: (cell: any) => formatNumber(cell.value),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
	{
		Header: 'Fecha',
		accessor: 'date',
	},
	{
		Header: '#Consumos',
		accessor: 'chargesCount',
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_CENTER },
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
		Header: 'Estado',
		accessor: 'liquidationStatus',
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_CENTER },
	},
];

export const REFUNDS_COLUMNS = [
	{
		Header: '#Reembolso',
		accessor: 'id',
	},
	{
		Header: 'Banco',
		accessor: 'bank',
	},
	{
		Header: 'Cuenta Bancaria',
		accessor: 'account',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_CENTER },
	},
	{
		Header: 'Importe',
		accessor: 'total',
		Cell: (cell: any) => formatNumber(cell.value),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
	{
		Header: 'Fecha',
		accessor: 'date',
	},
	{
		Header: 'Estado',
		accessor: 'refundStatus',
	},
	{
		Header: '#Liquidaciones',
		accessor: 'liquidationsCount',
	},
	{
		Header: 'Fecha Pago',
		accessor: 'paymentDate',
	},
	{
		Header: '#Voucher',
		accessor: 'voucher',
	},
];
