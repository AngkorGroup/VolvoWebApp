import { Option } from 'common/utils';

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
		Cell: (cell: any) => {
			const menus: Option[] = cell.value;
			return menus.map((m) => m.label).join(',');
		},
	},
];
