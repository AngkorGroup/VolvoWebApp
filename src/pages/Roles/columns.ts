import { renderMenuList } from './Roles';

export const ROLE_COLUMNS = [
	{
		Header: 'Id',
		accessor: 'id',
	},
	{
		Header: 'Nombre',
		accessor: 'name',
	},
	{
		Header: 'Accesos',
		accessor: 'roleMenus',
		Cell: (cell: any) => renderMenuList(cell.value),
	},
];
