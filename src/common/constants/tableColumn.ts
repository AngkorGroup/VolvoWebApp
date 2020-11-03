type Align = 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;

export const COLUMN_CENTER: Align = 'center';

export const ACTIONS_COLUMN = {
	title: 'Acciones',
	props: { align: COLUMN_CENTER },
};

export const TABLE_ROWS_OPTIONS = [5, 7, 10];
export const TABLE_ROWS_PER_PAGE = 5;
