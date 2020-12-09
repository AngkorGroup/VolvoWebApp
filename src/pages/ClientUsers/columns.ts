import { renderContactType } from 'common/utils';

export const CLIENT_USER_COLUMNS = [
	{
		Header: 'Tipo Doc.',
		accessor: 'documentTypeId',
	},
	{
		Header: 'Núm. Doc.',
		accessor: 'documentNumber',
	},
	{
		Header: 'Tipo',
		accessor: 'type',
		Cell: (cell: any) => renderContactType(cell.value),
	},
	{
		Header: 'Celular',
		accessor: 'phone',
	},
	{
		Header: 'Correo Electrónico',
		accessor: 'email',
	},
	{
		Header: 'Nombre Completo',
		accessor: 'fullName',
	},
	{
		Header: 'Estado',
		accessor: 'status',
	},
];
