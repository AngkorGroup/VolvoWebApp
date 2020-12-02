import { formatNumber } from 'common/utils';

export const LOAD_COLUMNS = [
	{
		Header: 'Id',
		accessor: 'id',
	},
	{
		Header: 'Contrato',
		accessor: 'number',
	},
	{
		Header: 'RUC',
		accessor: 'ruc',
	},
	{
		Header: 'Razón Social',
		accessor: 'name',
	},
	{
		Header: 'Fecha',
		accessor: 'date',
	},
	{
		Header: 'Chasis',
		accessor: 'chassis',
	},
	{
		Header: 'Factura',
		accessor: 'invoice',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
	},
	{
		Header: 'Importe',
		accessor: 'amount',
		Cell: (cell: any) => formatNumber(cell.value),
	},
	{
		Header: 'Saldo',
		accessor: 'balance',
		Cell: (cell: any) => formatNumber(cell.value),
		props: { align: 'right' },
	},
	{
		Header: 'Tipo',
		accessor: 'type',
	},
	{
		Header: 'Motivo',
		accessor: 'reason',
	},
	{
		Header: 'Tipo Tarjeta',
		accessor: 'card',
	},
	{
		Header: 'Referencia',
		accessor: 'tpNumber',
	},
	{
		Header: 'Creado Por',
		accessor: 'createdBy',
	},
	{
		Header: 'Creado el',
		accessor: 'createdAt',
	},
];
