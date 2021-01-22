import { COLUMN_CENTER, COLUMN_RIGHT } from 'common/constants';
import { formatNumber } from 'common/utils';

export const CONSUMES_COLUMNS = [
	{
		Header: '#Voucher',
		accessor: 'voucher',
	},
	{
		Header: 'Tipo',
		accessor: 'cardType',
	},
	{
		Header: 'Número de Tarjeta',
		accessor: 'cardNumber',
	},
	{
		Header: 'Cajero',
		accessor: 'cashier',
	},
	{
		Header: 'Cliente',
		accessor: 'client',
	},
	{
		Header: 'Fecha Op.',
		accessor: 'date',
	},
	{
		Header: 'Cobro',
		accessor: 'paymentType',
	},
	{
		Header: 'Estado',
		accessor: 'status',
	},
	{
		Header: 'Contacto',
		accessor: 'contact',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
	},
	{
		Header: 'Monto',
		accessor: 'amount',
		Cell: (cell: any) => formatNumber(cell.value),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_RIGHT },
	},
];
