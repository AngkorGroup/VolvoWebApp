import { TableCellProps } from '@material-ui/core';

type Align = 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;

export const COLUMN_CENTER: Align = 'center';

export const ACTIONS_LABEL = 'Acciones';

export const ACTIONS_COLUMN = {
	title: ACTIONS_LABEL,
	props: { align: COLUMN_CENTER },
};

export const ACTIONS_COLUMN_V2 = {
	Header: 'Acciones',
	headerProps: { align: COLUMN_CENTER },
	props: { align: COLUMN_CENTER },
};

export const TABLE_ROWS_OPTIONS = [10, 15, 30];
export const TABLE_ROWS_PER_PAGE = 5;

export interface TableColumn {
	title: string;
	value?: string;
	props?: TableCellProps;
}

export const ACTIONS_STYLE = {
	display: 'flex',
	justifyContent: 'center',
	'& > button': {
		marginLeft: '5px',
	},
};
