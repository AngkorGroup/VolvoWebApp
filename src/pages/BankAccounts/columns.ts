import { COLUMN_CENTER } from 'common/constants';

export const BANK_ACCOUNT_COLUMNS = [
	{
		Header: 'Id',
		accessor: 'id',
	},
	{
		Header: 'Cuenta Bancaria',
		accessor: 'account',
	},
	{
		Header: 'CCI',
		accessor: 'cci',
	},
	{
		Header: 'Moneda',
		accessor: 'currency',
		props: { align: COLUMN_CENTER },
		headerProps: { align: COLUMN_CENTER },
	},
	{
		Header: 'Por defecto',
		accessor: 'isDefault',
		Cell: (cell: any) => (cell.value ? 'Si' : 'No'),
		props: { align: COLUMN_CENTER },
		headerProps: { align: COLUMN_CENTER },
	},
	{
		Header: 'Tipo de Cuenta',
		accessor: 'bankAccountType',
	},
	{
		Header: 'Banco',
		accessor: 'bank',
	},
	{
		Header: 'Fecha Baja',
		accessor: 'archiveAt',
	},
];
