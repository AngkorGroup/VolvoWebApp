import { COLUMN_CENTER, COLUMN_RIGHT } from 'common/constants';
import { formatNumber, renderContactType } from 'common/utils';

export const CARD_COLUMNS = [
	{
		Header: 'Tipo',
		accessor: 'type',
	},
	{
		Header: 'Número',
		accessor: 'number',
	},
	{
		Header: '#TopPerú',
		accessor: 'tpNumber',
	},
	{
		Header: 'Fecha Creación',
		accessor: 'createdAt',
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
	{
		Header: 'Nombre del Contacto',
		accessor: 'contactName',
	},
	{
		Header: 'Tipo Contacto',
		accessor: 'contactType',
		Cell: (cell: any) => renderContactType(cell.value),
	},
	{
		Header: 'Celular',
		accessor: 'contactPhone',
	},
	{
		Header: 'Estado',
		accessor: 'status',
	},
];
