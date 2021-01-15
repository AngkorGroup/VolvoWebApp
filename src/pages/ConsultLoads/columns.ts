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
		Header: 'Dealer',
		accessor: 'dealer',
	},
	{
		Header: 'Contacto',
		accessor: 'contactName',
	},
	{
		Header: 'Celular',
		accessor: 'contactPhone',
	},
	{
		Header: 'Categoría',
		accessor: 'type',
	},
	{
		Header: 'Área de Negocio',
		accessor: 'reason',
	},
	{
		Header: 'Tipo Bono',
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
