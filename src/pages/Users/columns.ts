import { COLUMN_CENTER } from 'common/constants';

export const USER_COLUMNS = [
	{
		Header: 'Código',
		accessor: 'id',
	},
	{
		Header: 'Nombre',
		accessor: 'fullName',
	},
	{
		Header: 'Email',
		accessor: 'email',
	},
	{
		Header: 'Teléfono',
		accessor: 'phone',
	},
	{
		Header: 'Fecha de Creación',
		accessor: 'createdAt',
	},
	{
		Header: 'Tipo',
		accessor: 'type',
	},
	{
		Header: 'Estado',
		accessor: 'status',
	},
	{
		Header: 'Fecha de Baja',
		accessor: 'archiveAt',
	},
];

export const BATCH_COLUMNS = [
	{ title: 'Número' },
	{ title: 'Fecha de Creación' },
	{ title: 'Tipo' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
];
