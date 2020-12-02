import { COLUMN_CENTER } from 'common/constants';
import { renderCardColor } from './CardTypes';

export const CARD_TYPE_COLUMNS = [
	{
		Header: 'Tipo Tarjeta',
		accessor: 'type',
	},
	{
		Header: '#TopPerú',
		accessor: 'tpCode',
	},
	{
		Header: 'Descripción',
		accessor: 'description',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
		props: { align: COLUMN_CENTER },
		headerProps: { align: COLUMN_CENTER },
	},
	{
		Header: 'Plazo(meses)',
		accessor: 'term',
		props: { align: COLUMN_CENTER },
		headerProps: { align: COLUMN_CENTER },
	},
	{
		Header: 'Color',
		accessor: 'color',
		Cell: (cell: any) => renderCardColor(cell.value),
		headerProps: { align: COLUMN_CENTER },
		props: { align: COLUMN_CENTER },
	},
	{
		Header: 'Fecha Creación',
		accessor: 'createdAt',
	},
	{
		Header: 'Estado',
		accessor: 'status',
	},
	{
		Header: 'Fecha Baja',
		accessor: 'archiveAt',
	},
];
